import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Comment } from "./comment"
import { CommentForm } from "./comment-form"

interface CommentType {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    image: string | null
  }
}

interface CommentsListProps {
  postId: string
  initialComments: CommentType[]
}

export function CommentsList({ postId, initialComments }: CommentsListProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<CommentType[]>(initialComments)

  const handleCommentCreated = (newComment: CommentType) => {
    setComments((prev) => [newComment, ...prev])
  }

  const handleCommentUpdated = async (commentId: string, content: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error("Failed to update comment")
      }

      const updatedComment = await response.json()
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        )
      )
    } catch (error) {
      throw error
    }
  }

  const handleCommentDeleted = async (commentId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }

      setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="space-y-6">
      {session && (
        <CommentForm
          postId={postId}
          onSuccess={handleCommentCreated}
        />
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onUpdate={handleCommentUpdated}
            onDelete={handleCommentDeleted}
          />
        ))}
        {comments.length === 0 && (
          <p className="text-center text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  )
} 