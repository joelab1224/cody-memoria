import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memories = await prisma.memory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      relationship,
      description,
      personalityTraits,
      systemPrompt,
      anamAvatarId,
      avatarImageUrl,
      voiceCloneId,
    } = body;

    if (!name || !relationship || !systemPrompt) {
      return NextResponse.json(
        { error: 'name, relationship, and systemPrompt are required' },
        { status: 400 }
      );
    }

    const memory = await prisma.memory.create({
      data: {
        userId,
        name,
        relationship,
        description: description || null,
        personalityTraits: personalityTraits || [],
        favoriteMemories: [],
        systemPrompt,
        anamAvatarId: anamAvatarId || null,
        avatarImageUrl: avatarImageUrl || null,
        voiceCloneId: voiceCloneId || null,
      },
    });

    return NextResponse.json(memory);
  } catch (error) {
    console.error('Error creating memory:', error);
    return NextResponse.json(
      { error: 'Failed to create memory' },
      { status: 500 }
    );
  }
}
