import { useState } from "react"
import { useSession } from "next-auth/react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Comment } from "./comment"
import { CommentForm } from "./comment-form"

interface CommentsProps {
  postId: string
  comments: Array<{
    id: string
    content: string
    createdAt: string
    user: {
      id: string
      name: string
      image?: string
    }
  }>
}

export function Comments({ postId, comments: initialComments }: CommentsProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState(initialComments)
  const [isAddingComment, setIsAddingComment] = useState(false)

  const handleCommentAdded = (newComment: any) => {
    setComments((prev) => [newComment, ...prev])
    setIsAddingComment(false)
  }

  const handleCommentUpdated = (updatedComment: any) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    )
  }

  const handleCommentDeleted = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Comments</h3>
        {session && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingComment(true)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Comment
          </Button>
        )}
      </div>

      {isAddingComment && (
        <div className="space-y-4">
          <CommentForm
            postId={postId}
            onSuccess={handleCommentAdded}
            onCancel={() => setIsAddingComment(false)}
          />
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            postId={postId}
            onUpdate={handleCommentUpdated}
            onDelete={handleCommentDeleted}
          />
        ))}
      </div>
    </div>
  )
} 