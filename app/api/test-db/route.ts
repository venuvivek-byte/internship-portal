import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Try to get the count of internships
    const internshipCount = await prisma.internship.count();
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      internshipCount
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 