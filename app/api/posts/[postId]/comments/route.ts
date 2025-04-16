import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
})

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { content } = commentSchema.parse(body)

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: params.postId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }
    console.error("[CREATE_COMMENT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: params.postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error("[GET_COMMENTS]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 