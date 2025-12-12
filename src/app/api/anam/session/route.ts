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

    // Validate that either personaId or avatarId is provided
    if (!personaConfig.personaId && !personaConfig.avatarId) {
      return NextResponse.json(
        { error: 'Either personaId or avatarId is required in personaConfig' },
        { status: 400 }
      );
    }

    const result = await anamClient.createSessionToken(personaConfig, sessionOptions);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating Anam session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create session';
    
    // Return error with a flag to indicate it's an Anam API error
    return NextResponse.json(
      { 
        error: errorMessage,
        redirectToAnamLab: errorMessage.includes('Legacy session tokens') || 
                          errorMessage.includes('session token') ||
                          errorMessage.includes('Anam API error')
      },
      { status: 500 }
    );
  }
}
