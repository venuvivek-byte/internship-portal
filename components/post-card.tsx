import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface PostCardProps {
  post: {
    id: string
    content: string
    createdAt: Date
    user: {
      id: string
      name: string
      profileImage: string | null
      headline: string | null
    }
    likes: Array<{ id: string }>
    comments: Array<{
      id: string
      content: string
      user: {
        id: string
        name: string
        profileImage: string | null
      }
    }>
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <Link href={`/profile/${post.user.id}`}>
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            {post.user.profileImage ? (
              <Image
                src={post.user.profileImage}
                alt={post.user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-lg font-medium">
                  {post.user.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 space-y-1">
          <Link href={`/profile/${post.user.id}`}>
            <h3 className="font-semibold hover:underline">{post.user.name}</h3>
          </Link>
          {post.user.headline && (
            <p className="text-sm text-muted-foreground">{post.user.headline}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <p className="mt-4 whitespace-pre-wrap">{post.content}</p>
      <div className="mt-4 flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="space-x-2">
          <Heart className="h-4 w-4" />
          <span>{post.likes.length}</span>
        </Button>
        <Button variant="ghost" size="sm" className="space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments.length}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      {post.comments.length > 0 && (
        <div className="mt-4 space-y-4 border-t pt-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4">
              <Link href={`/profile/${comment.user.id}`}>
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  {comment.user.profileImage ? (
                    <Image
                      src={comment.user.profileImage}
                      alt={comment.user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="text-sm font-medium">
                        {comment.user.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="flex-1 space-y-1">
                <Link href={`/profile/${comment.user.id}`}>
                  <h4 className="text-sm font-medium hover:underline">
                    {comment.user.name}
                  </h4>
                </Link>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
} 