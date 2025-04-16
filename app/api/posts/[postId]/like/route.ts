import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/db"
import { authOptions } from "@/lib/auth"

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        postId: params.postId,
      },
    })

    return NextResponse.json(like)
  } catch (error) {
    console.error("[LIKE_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const like = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        postId: params.postId,
      },
    })

    if (!like) {
      return new NextResponse("Like not found", { status: 404 })
    }

    await prisma.like.delete({
      where: { id: like.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[UNLIKE_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 