import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const postSchema = z.object({
  content: z.string().min(1).max(1000),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { content } = postSchema.parse(body)

    const post = await prisma.post.create({
      data: {
        content,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            headline: true,
          },
        },
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    const posts = await prisma.post.findMany({
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            headline: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: userId ? {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        } : undefined,
      },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("[POSTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 