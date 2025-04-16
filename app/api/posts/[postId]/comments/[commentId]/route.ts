import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
})

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const comment = await prisma.comment.findUnique({
      where: { id: params.commentId },
      include: { post: true },
    })

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 })
    }

    // Check if user is the comment author or post author
    if (comment.userId !== session.user.id && comment.post.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.comment.delete({
      where: { id: params.commentId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[DELETE_COMMENT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { content } = commentSchema.parse(body)

    const comment = await prisma.comment.findUnique({
      where: { id: params.commentId },
    })

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 })
    }

    if (comment.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedComment = await prisma.comment.update({
      where: { id: params.commentId },
      data: { content },
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

    return NextResponse.json(updatedComment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }
    console.error("[UPDATE_COMMENT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 