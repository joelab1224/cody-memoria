import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';

// Helper function to get or create user in database
async function getOrCreateUser(clerkUserId: string) {
  // Try to find user by Clerk ID (using Clerk ID as our User.id)
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
  });

  if (!user) {
    // Get user info from Clerk
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      throw new Error('Unable to get user information from Clerk');
    }

    // Create user in our database using Clerk ID as the ID
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

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in database
    await getOrCreateUser(userId);

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

    // Ensure user exists in database before creating memory
    await getOrCreateUser(userId);

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
