import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const internships = await db.internship.findMany({
      include: {
        company: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    return NextResponse.json(internships)
  } catch (error) {
    console.error("Error fetching internships:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, you'd validate the user is authenticated and authorized
    // to create an internship (e.g., has a company account)

    const { title, description, requirements, location, locationType, duration, stipend, fieldId, companyId } = body

    const internship = await db.internship.create({
      data: {
        title,
        description,
        requirements,
        location,
        locationType,
        duration,
        stipend,
        field: {
          connect: { id: fieldId },
        },
        company: {
          connect: { id: companyId },
        },
      },
    })

    return NextResponse.json(internship, { status: 201 })
  } catch (error) {
    console.error("Error creating internship:", error)
    return NextResponse.json({ error: "Failed to create internship" }, { status: 500 })
  }
}

