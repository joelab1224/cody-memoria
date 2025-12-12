import { NextRequest, NextResponse } from 'next/server';
import { anamClient } from '@/lib/anam';
import { AnamPersonaConfig, AnamSessionOptions } from '@/types/anam';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personaConfig, sessionOptions } = body as {
      personaConfig: AnamPersonaConfig;
      sessionOptions?: AnamSessionOptions;
    };

    if (!personaConfig) {
      return NextResponse.json(
        { error: 'personaConfig is required' },
        { status: 400 }
      );
    }

    if (!personaConfig.avatarId) {
      return NextResponse.json(
        { error: 'avatarId is required in personaConfig' },
        { status: 400 }
      );
    }

    const result = await anamClient.createSessionToken(personaConfig, sessionOptions);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating Anam session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create session' },
      { status: 500 }
    );
  }
}
