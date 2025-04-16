import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface PostProps {
  post: {
    id: string
    content: string
    createdAt: Date
    user: {
      id: string
      name: string
      image: string | null
      headline: string | null
    }
    _count: {
      likes: number
      comments: number
    }
    likes: { id: string }[]
  }
}

export function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.likes.length > 0)
  const [likeCount, setLikeCount] = useState(post._count.likes)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: isLiked ? "DELETE" : "POST",
      })

      if (!response.ok) throw new Error("Failed to like post")

      setIsLiked(!isLiked)
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
      toast.success(isLiked ? "Post unliked" : "Post liked")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <div className="flex items-start gap-4">
        <Link href={`/profile/${post.user.id}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.image || undefined} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${post.user.id}`} className="font-semibold hover:underline">
            {post.user.name}
          </Link>
          {post.user.headline && (
            <p className="text-sm text-muted-foreground">{post.user.headline}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <p className="text-sm whitespace-pre-wrap">{post.content}</p>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleLike}
          disabled={isLoading}
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
          />
          {likeCount}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          {post._count.comments}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 