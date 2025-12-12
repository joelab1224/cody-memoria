import { NextRequest, NextResponse } from 'next/server';
import { elevenLabsClient } from '@/lib/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { voiceId, text, voiceDescription } = body as {
      voiceId?: string;
      text?: string;
      voiceDescription?: string;
    };

    const sampleText = text || 'Hello, this is a preview of my voice. How does it sound to you?';

    // If voiceId is provided, preview an existing voice using TTS
    if (voiceId) {
      const audioBuffer = await elevenLabsClient.previewVoice(voiceId, sampleText);
      
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.byteLength.toString(),
        },
      });
    }

    // If voiceDescription is provided, generate voice previews
    if (voiceDescription) {
      if (voiceDescription.length < 20 || voiceDescription.length > 1000) {
        return NextResponse.json(
          { error: 'voiceDescription must be between 20 and 1000 characters' },
          { status: 400 }
        );
      }

      const result = await elevenLabsClient.createVoicePreviews(
        voiceDescription,
        sampleText.length >= 100 ? sampleText : undefined // text must be 100-1000 chars or auto-generate
      );

      // Return the previews as JSON with base64 audio
      return NextResponse.json({
        previews: result.previews.map((p) => ({
          generatedVoiceId: p.generated_voice_id,
          audioBase64: p.audio_base_64,
          mediaType: p.media_type,
          durationSecs: p.duration_secs,
        })),
        text: result.text,
      });
    }

    return NextResponse.json(
      { error: 'Either voiceId or voiceDescription is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error previewing voice:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to preview voice' },
      { status: 500 }
    );
  }
}
