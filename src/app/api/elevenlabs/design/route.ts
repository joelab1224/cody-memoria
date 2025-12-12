import { NextRequest, NextResponse } from 'next/server';
import { elevenLabsClient } from '@/lib/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, voiceDescription, text, generatedVoiceId } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      );
    }

    // If generatedVoiceId is provided, create voice directly from preview
    if (generatedVoiceId) {
      if (!voiceDescription) {
        return NextResponse.json(
          { error: 'voiceDescription is required when using generatedVoiceId' },
          { status: 400 }
        );
      }

      const result = await elevenLabsClient.createVoiceFromPreview(
        name,
        voiceDescription,
        generatedVoiceId
      );
      return NextResponse.json(result);
    }

    // Otherwise, generate previews and create voice
    if (!voiceDescription) {
      return NextResponse.json(
        { error: 'voiceDescription is required (20-1000 characters describing the voice)' },
        { status: 400 }
      );
    }

    if (voiceDescription.length < 20 || voiceDescription.length > 1000) {
      return NextResponse.json(
        { error: 'voiceDescription must be between 20 and 1000 characters' },
        { status: 400 }
      );
    }

    const result = await elevenLabsClient.designVoice({
      name,
      voiceDescription,
      text,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error designing voice:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to design voice' },
      { status: 500 }
    );
  }
}
