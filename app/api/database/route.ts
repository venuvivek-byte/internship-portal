import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [users, profiles, companies, internships, applications] = await Promise.all([
      prisma.user.findMany(),
      prisma.profile.findMany(),
      prisma.company.findMany(),
      prisma.internship.findMany(),
      prisma.application.findMany(),
    ]);

    return NextResponse.json({
      users,
      profiles,
      companies,
      internships,
      applications,
    });
  } catch (error) {
    console.error('Error fetching database data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch database data' },
      { status: 500 }
    );
  }
} 