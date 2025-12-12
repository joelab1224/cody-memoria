import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memories = await prisma.memory.findMany({
      where: { userId: session.user.id },
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
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
        userId: session.user.id,
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
