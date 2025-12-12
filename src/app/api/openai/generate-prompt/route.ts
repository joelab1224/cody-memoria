import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { memoryData } = body;

    if (!memoryData) {
      return NextResponse.json(
        { error: 'memoryData is required' },
        { status: 400 }
      );
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Build the prompt for OpenAI
    const prompt = `Create a detailed system prompt for an AI avatar that represents ${memoryData.name || 'a loved one'}${memoryData.relationship ? ` (${memoryData.relationship})` : ''}.

${memoryData.description ? `Description: ${memoryData.description}` : ''}

${memoryData.personalityTraits?.length ? `Personality traits: ${memoryData.personalityTraits.join(', ')}` : ''}

${memoryData.favoriteMemories?.length ? `Favorite memories: ${memoryData.favoriteMemories.map((m: string) => `• ${m}`).join('\n')}` : ''}

${memoryData.additionalInfo ? `Additional information: ${memoryData.additionalInfo}` : ''}

Create a warm, empathetic, and natural system prompt in Spanish that will guide the AI to speak as this person would. The prompt should:
- Be conversational and warm
- Reflect the personality traits
- Reference the favorite memories naturally
- Be concise (2-3 sentences for the main instruction, plus context)
- Use a natural, loving tone as if reminiscing about shared memories

Return only the system prompt text, without any additional explanation or formatting.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating empathetic AI system prompts for preserving family memories. Create prompts that are warm, natural, and conversational.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate prompt from OpenAI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedPrompt = data.choices[0]?.message?.content?.trim();

    if (!generatedPrompt) {
      return NextResponse.json(
        { error: 'No prompt generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ systemPrompt: generatedPrompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}

