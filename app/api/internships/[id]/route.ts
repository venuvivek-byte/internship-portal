import { NextResponse } from "next/server";
import { findInternshipById } from "@/lib/mock-data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const internship = findInternshipById(params.id);

    if (!internship) {
      return new NextResponse("Internship not found", { status: 404 });
    }

    return NextResponse.json(internship);
  } catch (error) {
    console.error("[INTERNSHIP_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 