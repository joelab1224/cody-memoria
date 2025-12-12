'use client';

import * as React from 'react';
import { Phone, PhoneOff, Mic, MicOff, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface Memory {
  id: string;
  name: string;
  relationship: string;
  systemPrompt: string;
  anamAvatarId: string | null;
  voiceCloneId: string | null;
  avatarImageUrl: string | null;
}

interface ConversationViewProps {
  memory: Memory;
  className?: string;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export function ConversationView({ memory, className }: ConversationViewProps) {
  const [status, setStatus] = React.useState<ConnectionStatus>('disconnected');
  const [isMuted, setIsMuted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [showAnamLab, setShowAnamLab] = React.useState(false);
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const anamClientRef = React.useRef<unknown>(null);
  const audioInputStreamRef = React.useRef<unknown>(null);
  const elevenLabsWsRef = React.useRef<WebSocket | null>(null);

  const startConversation = async () => {
    if (!memory.anamAvatarId || !memory.voiceCloneId) {
      setError('Avatar and voice are required to start a conversation');
      return;
    }

    setStatus('connecting');
    setError(null);

    try {
      // 1. Get Anam session token
      const sessionResponse = await fetch('/api/anam/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaConfig: {
            avatarId: memory.anamAvatarId,
            llmId: 'CUSTOMER_CLIENT_V1', // Client-side LLM processing (ElevenLabs handles conversation)
            systemPrompt: memory.systemPrompt,
            // Note: voiceId is optional when using CUSTOMER_CLIENT_V1 since ElevenLabs handles voice
          },
          sessionOptions: {
            disableInputAudio: true, // ElevenLabs handles audio input
          },
        }),
      });

      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json();
        const errorMessage = errorData.error || 'Failed to create Anam session';
        
        // If it's an Anam API error or the API indicates we should redirect, show Anam Lab iframe
        if (
          errorData.redirectToAnamLab ||
          errorMessage.includes('Legacy session tokens') ||
          errorMessage.includes('session token') ||
          errorMessage.includes('Anam API error')
        ) {
          setShowAnamLab(true);
          setError('Please configure your avatar in Anam Lab below');
          setStatus('error');
          return;
        }
        
        throw new Error(errorMessage);
      }

      const { sessionToken } = await sessionResponse.json();

      // 2. Import and initialize Anam SDK dynamically
      const { createClient } = await import('@anam-ai/js-sdk');
      
      const anamClient = createClient(sessionToken, {
        disableInputAudio: true,
      });
      anamClientRef.current = anamClient;

      // 3. Stream to video element
      if (videoRef.current) {
        await anamClient.streamToVideoElement(videoRef.current.id);
      }

      // 4. Create audio input stream for lip-sync
      const audioInputStream = anamClient.createAgentAudioInputStream({
        encoding: 'pcm_s16le',
        sampleRate: 16000,
        channels: 1,
      });
      audioInputStreamRef.current = audioInputStream;

      // 5. Create ElevenLabs conversational agent (you'll need to set up the agent beforehand)
      // For now, we'll use the voice ID directly with the WebSocket
      const elevenLabsResponse = await fetch('/api/elevenlabs/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${memory.name} Agent`,
          voiceId: memory.voiceCloneId,
          systemPrompt: memory.systemPrompt,
          firstMessage: `Hello! It's so wonderful to talk with you.`,
        }),
      });

      if (!elevenLabsResponse.ok) {
        // If agent creation fails, continue with direct connection
        console.warn('Could not create ElevenLabs agent, using direct voice');
      }

      const agentData = elevenLabsResponse.ok ? await elevenLabsResponse.json() : null;

      // 6. Connect to ElevenLabs WebSocket
      if (agentData?.agent_id) {
        const ws = new WebSocket(
          `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentData.agent_id}`
        );
        elevenLabsWsRef.current = ws;

        ws.onopen = () => {
          console.log('ElevenLabs WebSocket connected');
          setStatus('connected');
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);

          // Forward audio to Anam for lip-sync
          if (msg.type === 'audio' && msg.audio_event?.audio_base_64) {
            const stream = audioInputStreamRef.current as {
              sendAudioChunk: (chunk: string) => void;
            } | null;
            stream?.sendAudioChunk(msg.audio_event.audio_base_64);
          }

          // Track conversation
          if (msg.type === 'user_transcript') {
            setMessages((prev) => [
              ...prev,
              { role: 'user', content: msg.user_transcript },
            ]);
          }

          if (msg.type === 'agent_response') {
            setMessages((prev) => [
              ...prev,
              { role: 'assistant', content: msg.agent_response },
            ]);
            const stream = audioInputStreamRef.current as {
              endSequence: () => void;
            } | null;
            stream?.endSequence();
          }

          if (msg.type === 'interruption') {
            const stream = audioInputStreamRef.current as {
              endSequence: () => void;
            } | null;
            stream?.endSequence();
          }
        };

        ws.onerror = (err) => {
          console.error('ElevenLabs WebSocket error:', err);
          setError('Connection error with voice service');
          setStatus('error');
        };

        ws.onclose = () => {
          console.log('ElevenLabs WebSocket closed');
          if (status === 'connected') {
            setStatus('disconnected');
          }
        };
      } else {
        // Fallback: Just show the avatar without voice conversation
        setStatus('connected');
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      
      // If it's an Anam session token error, show Anam Lab iframe
      if (
        errorMessage.includes('Legacy session tokens') ||
        errorMessage.includes('session token') ||
        errorMessage.includes('Anam API error') ||
        errorMessage.includes('Failed to create Anam session')
      ) {
        setShowAnamLab(true);
        setError('Please configure your avatar in Anam Lab below');
        setStatus('error');
        return;
      }
      
      setError(errorMessage);
      setStatus('error');
    }
  };

  const endConversation = () => {
    // Close ElevenLabs WebSocket
    if (elevenLabsWsRef.current) {
      elevenLabsWsRef.current.close();
      elevenLabsWsRef.current = null;
    }

    // Stop Anam streaming
    const client = anamClientRef.current as { stopStreaming?: () => void } | null;
    if (client?.stopStreaming) {
      client.stopStreaming();
    }
    anamClientRef.current = null;
    audioInputStreamRef.current = null;

    setStatus('disconnected');
    setMessages([]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement actual mute/unmute logic with ElevenLabs
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      endConversation();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Video Container */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 h-full relative">
          {status === 'disconnected' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
              {memory.avatarImageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={memory.avatarImageUrl}
                    alt={memory.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 opacity-50"
                  />
                  <p className="text-muted-foreground mb-4">
                    Ready to start a conversation with {memory.name}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground mb-4">
                  Click Start to begin the conversation
                </p>
              )}
            </div>
          )}

          {status === 'connecting' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Connecting...</p>
            </div>
          )}

          {status === 'error' && !showAnamLab && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
              <AlertCircle className="w-12 h-12 text-destructive mb-4" />
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={startConversation} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          <video
            id="anam-avatar-video"
            ref={videoRef}
            autoPlay
            playsInline
            className={cn(
              'w-full h-full object-cover',
              status !== 'connected' && 'hidden'
            )}
          />
        </CardContent>
      </Card>

      {/* Chat History */}
      {messages.length > 0 && (
        <Card className="mt-4 max-h-48 overflow-y-auto">
          <CardContent className="p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'text-sm p-2 rounded-lg max-w-[80%]',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                )}
              >
                <span className="font-medium">
                  {msg.role === 'user' ? 'You' : memory.name}:
                </span>{' '}
                {msg.content}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Anam Lab Configuration Card */}
      {showAnamLab && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Avatar Configuration Required</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Your avatar needs to be configured in Anam Lab. Click the button below to open Anam Lab in a new tab.
                Once you've configured your avatar, return here and click "Try Again" to reconnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Button
                  onClick={() => {
                    window.open('https://lab.anam.ai/avatars?filter=custom', '_blank', 'noopener,noreferrer');
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-[#7A8A76] to-[#B8952F] text-white hover:opacity-90"
                >
                  Open Anam Lab
                </Button>
                <Button
                  onClick={() => {
                    setShowAnamLab(false);
                    setError(null);
                  }}
                  variant="outline"
                  size="lg"
                >
                  Dismiss
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                After configuring your avatar, make sure to update the avatar ID in your memory settings.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {status === 'disconnected' && (
          <Button
            onClick={startConversation}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <Phone className="w-5 h-5 mr-2" />
            Start Conversation
          </Button>
        )}

        {status === 'connecting' && (
          <Button disabled size="lg">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Connecting...
          </Button>
        )}

        {status === 'connected' && (
          <>
            <Button
              onClick={toggleMute}
              variant="outline"
              size="lg"
              className={cn(isMuted && 'bg-muted')}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>

            <Button
              onClick={endConversation}
              size="lg"
              variant="destructive"
            >
              <PhoneOff className="w-5 h-5 mr-2" />
              End Conversation
            </Button>
          </>
        )}
      </div>

      {!memory.anamAvatarId || !memory.voiceCloneId ? (
        <p className="text-sm text-muted-foreground text-center mt-4">
          This memory needs both an avatar and voice to start a conversation.
        </p>
      ) : null}
    </div>
  );
}
