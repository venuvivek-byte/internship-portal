import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return new NextResponse('Internship ID is required', { status: 400 });
    }

    // Check if internship exists
    const internship = await db.internship.findUnique({
      where: { id },
    });

    if (!internship) {
      return new NextResponse('Internship not found', { status: 404 });
    }

    // Check if already saved
    const existingSave = await db.savedInternship.findFirst({
      where: {
        user_id: session.user.id,
        internship_id: id,
      },
    });

    if (existingSave) {
      return new NextResponse('Internship already saved', { status: 400 });
    }

    // Save the internship
    const savedInternship = await db.savedInternship.create({
      data: {
        user_id: session.user.id,
        internship_id: id,
      },
    });

    return NextResponse.json(savedInternship);
  } catch (error) {
    console.error('[INTERNSHIP_SAVE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 