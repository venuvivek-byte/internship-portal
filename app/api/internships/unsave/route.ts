import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return new NextResponse('Internship ID is required', { status: 400 });
    }

    // Delete the saved internship
    await db.savedInternship.deleteMany({
      where: {
        user_id: session.user.id,
        internship_id: id,
      },
    });

    return new NextResponse('Internship unsaved successfully');
  } catch (error) {
    console.error('[INTERNSHIP_UNSAVE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 