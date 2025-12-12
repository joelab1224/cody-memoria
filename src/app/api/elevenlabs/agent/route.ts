import { NextRequest, NextResponse } from 'next/server';
import { elevenLabsClient } from '@/lib/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, voiceId, systemPrompt, firstMessage } = body;

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    if (!voiceId) {
      return NextResponse.json({ error: 'voiceId is required' }, { status: 400 });
    }

    if (!systemPrompt) {
      return NextResponse.json({ error: 'systemPrompt is required' }, { status: 400 });
    }

    const result = await elevenLabsClient.createConversationalAgent({
      name,
      voiceId,
      systemPrompt,
      firstMessage,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating ElevenLabs agent:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create agent' },
      { status: 500 }
    );
  }
}
