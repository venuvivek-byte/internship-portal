import { NextResponse } from "next/server"
import { z } from "zod"
import { findInternshipById } from "@/lib/mock-data"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const applicationSchema = z.object({
  internshipId: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  coverLetter: z.string(),
  resumeUrl: z.string().url("Please provide a valid URL for your resume"),
  availability: z.string(),
  portfolioUrl: z.string().url("Please provide a valid URL for your portfolio").optional(),
  additionalInfo: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    console.log("Starting application submission...")
    
    const session = await auth()
    console.log("Auth session:", session)

    if (!session?.user?.id) {
      console.log("No authenticated user found")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    console.log("Received application data:", body)

    let validatedData;
    try {
      validatedData = applicationSchema.parse(body)
      console.log("Validated data:", validatedData)
    } catch (validationError) {
      console.error("Validation error:", validationError)
      if (validationError instanceof z.ZodError) {
        return new NextResponse(JSON.stringify(validationError.errors), { 
          status: 422,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      throw validationError
    }

    // Check if internship exists
    const internship = findInternshipById(validatedData.internshipId)
    console.log("Found internship:", internship)

    if (!internship) {
      return new NextResponse(JSON.stringify({ message: "Internship not found" }), { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    // Check if user has already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: session.user.id,
        internshipId: validatedData.internshipId,
      },
    })

    if (existingApplication) {
      return new NextResponse(JSON.stringify({ 
        message: "You have already applied for this internship"
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    // Create application in database
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        internshipId: validatedData.internshipId,
        name: validatedData.name,
        email: validatedData.email,
        resumeUrl: validatedData.resumeUrl,
        coverLetter: validatedData.coverLetter,
        availability: validatedData.availability,
        portfolioUrl: validatedData.portfolioUrl,
        additionalInfo: validatedData.additionalInfo,
        status: "PENDING"
      },
    })

    console.log("Application stored successfully:", application)
    return NextResponse.json(application)
  } catch (error) {
    console.error("Application submission error:", error)
    return new NextResponse(JSON.stringify({ 
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : String(error)
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return new NextResponse(JSON.stringify({ 
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : String(error)
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
} 