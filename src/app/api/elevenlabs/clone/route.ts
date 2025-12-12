import { NextRequest, NextResponse } from 'next/server';
import { elevenLabsClient } from '@/lib/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const files = formData.getAll('files') as File[];

    if (!name) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'At least one audio file is required' },
        { status: 400 }
      );
    }

    const result = await elevenLabsClient.cloneVoice(
      name,
      files,
      description || undefined
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error cloning voice:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to clone voice' },
      { status: 500 }
    );
  }
}
