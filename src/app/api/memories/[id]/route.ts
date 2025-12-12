import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';

// Helper function to get or create user in database
async function getOrCreateUser(clerkUserId: string) {
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      throw new Error('Unable to get user information from Clerk');
    }

    user = await prisma.user.create({
      data: {
        id: clerkUserId,
        email: clerkUser.emailAddresses[0]?.emailAddress || `user-${clerkUserId}@example.com`,
        name: clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : clerkUser.firstName || clerkUser.username || null,
        image: clerkUser.imageUrl || null,
        emailVerified: clerkUser.emailAddresses[0]?.verification?.status === 'verified'
          ? new Date()
          : null,
      },
    });
  }

  return user;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in database
    await getOrCreateUser(userId);

    const memory = await prisma.memory.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!memory) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    return NextResponse.json(memory);
  } catch (error) {
    console.error('Error fetching memory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memory' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Verify ownership
    const existing = await prisma.memory.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    const memory = await prisma.memory.update({
      where: { id },
      data: {
        name: body.name,
        relationship: body.relationship,
        description: body.description,
        personalityTraits: body.personalityTraits,
        favoriteMemories: body.favoriteMemories,
        systemPrompt: body.systemPrompt,
        anamAvatarId: body.anamAvatarId,
        avatarImageUrl: body.avatarImageUrl,
        voiceCloneId: body.voiceCloneId,
      },
    });

    return NextResponse.json(memory);
  } catch (error) {
    console.error('Error updating memory:', error);
    return NextResponse.json(
      { error: 'Failed to update memory' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify ownership
    const existing = await prisma.memory.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    await prisma.memory.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting memory:', error);
    return NextResponse.json(
      { error: 'Failed to delete memory' },
      { status: 500 }
    );
  }
}
