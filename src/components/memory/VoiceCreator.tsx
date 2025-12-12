'use client';

import * as React from 'react';
import { Upload, Mic, Play, Pause, Loader2, Volume2, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface VoiceCreatorProps {
  onVoiceCreated: (voiceId: string) => void;
  initialVoiceId?: string;
  className?: string;
}

interface VoicePreviewItem {
  generatedVoiceId: string;
  audioBase64: string;
  mediaType: string;
  durationSecs: number;
}

export function VoiceCreator({ onVoiceCreated, initialVoiceId, className }: VoiceCreatorProps) {
  const [activeTab, setActiveTab] = React.useState<'clone' | 'design'>('clone');
  
  // Clone state
  const [audioFiles, setAudioFiles] = React.useState<File[]>([]);
  const [cloneName, setCloneName] = React.useState('');
  const [cloneDescription, setCloneDescription] = React.useState('');
  
  // Design state
  const [designName, setDesignName] = React.useState('');
  const [voiceDescription, setVoiceDescription] = React.useState('');
  const [voicePreviews, setVoicePreviews] = React.useState<VoicePreviewItem[]>([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = React.useState<number>(0);
  
  // Preview state
  const [previewText, setPreviewText] = React.useState(
    'Hello, this is a preview of my voice. How does it sound to you?'
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPreviewing, setIsPreviewing] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [createdVoiceId, setCreatedVoiceId] = React.useState<string | null>(initialVoiceId || null);
  
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) => file.type.startsWith('audio/') && file.size <= 25 * 1024 * 1024
    );
    
    if (validFiles.length !== files.length) {
      setError('Some files were skipped. Only audio files under 25MB are allowed.');
    }
    
    setAudioFiles((prev) => [...prev, ...validFiles]);
  };

  const removeAudioFile = (index: number) => {
    setAudioFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    setError(null);

    try {
      // If we have a created voice, preview it with TTS
      if (createdVoiceId) {
        const response = await fetch('/api/elevenlabs/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voiceId: createdVoiceId, text: previewText }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to preview voice');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      // For design tab, generate voice previews
      if (activeTab === 'design') {
        if (!voiceDescription || voiceDescription.length < 20) {
          setError('Voice description must be at least 20 characters');
          setIsPreviewing(false);
          return;
        }

        const response = await fetch('/api/elevenlabs/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voiceDescription, text: previewText }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate voice previews');
        }

        const data = await response.json();
        setVoicePreviews(data.previews);
        setSelectedPreviewIndex(0);

        // Play the first preview
        if (data.previews.length > 0) {
          playPreviewAudio(data.previews[0].audioBase64, data.previews[0].mediaType);
        }
        return;
      }

      setError('Please create a voice first before previewing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to preview voice');
    } finally {
      setIsPreviewing(false);
    }
  };

  const playPreviewAudio = (audioBase64: string, mediaType: string) => {
    const audioBlob = new Blob(
      [Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0))],
      { type: mediaType || 'audio/mpeg' }
    );
    const audioUrl = URL.createObjectURL(audioBlob);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePlaySelectedPreview = (index: number) => {
    setSelectedPreviewIndex(index);
    const preview = voicePreviews[index];
    if (preview) {
      playPreviewAudio(preview.audioBase64, preview.mediaType);
    }
  };

  const handleCloneVoice = async () => {
    if (audioFiles.length === 0) {
      setError('Please upload at least one audio file');
      return;
    }

    if (!cloneName.trim()) {
      setError('Please enter a name for the voice');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', cloneName);
      if (cloneDescription) {
        formData.append('description', cloneDescription);
      }
      audioFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/elevenlabs/clone', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clone voice');
      }

      const data = await response.json();
      setCreatedVoiceId(data.voice_id);
      onVoiceCreated(data.voice_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clone voice');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDesignVoice = async () => {
    if (!designName.trim()) {
      setError('Please enter a name for the voice');
      return;
    }

    if (!voiceDescription || voiceDescription.length < 20) {
      setError('Voice description must be at least 20 characters');
      return;
    }

    // If we have previews, use the selected one
    const selectedPreview = voicePreviews[selectedPreviewIndex];
    
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch('/api/elevenlabs/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: designName,
          voiceDescription,
          generatedVoiceId: selectedPreview?.generatedVoiceId,
          text: previewText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to design voice');
      }

      const data = await response.json();
      setCreatedVoiceId(data.voice_id);
      onVoiceCreated(data.voice_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to design voice');
    } finally {
      setIsCreating(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleAudioFileChange}
        className="hidden"
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'clone' | 'design')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clone">
            <Mic className="w-4 h-4 mr-2" />
            Clone Voice
          </TabsTrigger>
          <TabsTrigger value="design">
            <Volume2 className="w-4 h-4 mr-2" />
            Design Voice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clone" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="clone-name">Voice Name</Label>
            <Input
              id="clone-name"
              placeholder="Enter a name for this voice"
              value={cloneName}
              onChange={(e) => setCloneName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clone-description">Description (optional)</Label>
            <Textarea
              id="clone-description"
              placeholder="Describe this voice..."
              value={cloneDescription}
              onChange={(e) => setCloneDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Audio Samples</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload audio files
              </p>
              <p className="text-xs text-muted-foreground">
                MP3, WAV, M4A (MAX. 25MB each)
              </p>
            </div>
          </div>

          {audioFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({audioFiles.length})</Label>
              <div className="space-y-2">
                {audioFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAudioFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleCloneVoice}
            disabled={isCreating || audioFiles.length === 0 || !cloneName.trim()}
            className="w-full"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Voice...
              </>
            ) : (
              'Create Cloned Voice'
            )}
          </Button>
        </TabsContent>

        <TabsContent value="design" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="design-name">Voice Name</Label>
            <Input
              id="design-name"
              placeholder="Enter a name for this voice"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice-description">
              Voice Description <span className="text-muted-foreground">(20-1000 characters)</span>
            </Label>
            <Textarea
              id="voice-description"
              placeholder="Describe the voice you want to create. For example: 'A warm, gentle elderly woman with a slight Southern American accent. Her voice is comforting and wise, like a loving grandmother telling bedtime stories.'"
              value={voiceDescription}
              onChange={(e) => setVoiceDescription(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {voiceDescription.length}/1000 characters
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handlePreview}
              disabled={isPreviewing || voiceDescription.length < 20}
              variant="outline"
              className="flex-1"
            >
              {isPreviewing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Previews...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Voice Previews
                </>
              )}
            </Button>
          </div>

          {voicePreviews.length > 0 && (
            <div className="space-y-2">
              <Label>Select a Voice ({voicePreviews.length} options)</Label>
              <div className="grid gap-2">
                {voicePreviews.map((preview, index) => (
                  <div
                    key={preview.generatedVoiceId}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
                      selectedPreviewIndex === index
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    )}
                    onClick={() => setSelectedPreviewIndex(index)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="voice-preview"
                        checked={selectedPreviewIndex === index}
                        onChange={() => setSelectedPreviewIndex(index)}
                        className="accent-primary"
                      />
                      <span className="text-sm">Voice Option {index + 1}</span>
                      <span className="text-xs text-muted-foreground">
                        ({preview.durationSecs.toFixed(1)}s)
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySelectedPreview(index);
                      }}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleDesignVoice}
            disabled={isCreating || !designName.trim() || voiceDescription.length < 20}
            className="w-full"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Voice...
              </>
            ) : voicePreviews.length > 0 ? (
              'Create Selected Voice'
            ) : (
              'Generate & Create Voice'
            )}
          </Button>
        </TabsContent>
      </Tabs>

      {/* Preview Section - Only shown when voice is created */}
      {createdVoiceId && (
        <div className="mt-6 p-4 border rounded-lg space-y-4">
          <Label>Test Your Voice</Label>
          <Textarea
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            rows={2}
            placeholder="Enter text to preview..."
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handlePreview}
              disabled={isPreviewing}
              variant="outline"
              className="flex-1"
            >
              {isPreviewing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Preview Voice
                </>
              )}
            </Button>
            
            {isPlaying && (
              <Button onClick={togglePlayPause} variant="outline" size="icon">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      )}

      {createdVoiceId && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            Voice created successfully! You can preview it above.
          </p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  );
}
