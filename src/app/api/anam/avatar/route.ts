import { NextRequest, NextResponse } from 'next/server';
import { anamClient } from '@/lib/anam';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const displayName = formData.get('displayName') as string | null;

    if (!imageFile && !imageUrl) {
      return NextResponse.json(
        { error: 'Either image file or imageUrl is required' },
        { status: 400 }
      );
    }

    // displayName is required by Anam API (3-50 characters)
    const name = displayName || `Avatar ${Date.now()}`;
    if (name.length < 3 || name.length > 50) {
      return NextResponse.json(
        { error: 'displayName must be between 3 and 50 characters' },
        { status: 400 }
      );
    }

    let result;

    if (imageFile) {
      result = await anamClient.createOneShotAvatar(imageFile, name);
    } else if (imageUrl) {
      result = await anamClient.createOneShotAvatarFromUrl(imageUrl, name);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating one-shot avatar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create avatar' },
      { status: 500 }
    );
  }
}
