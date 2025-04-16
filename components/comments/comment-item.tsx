import { useState } from "react"
import { useSession } from "next-auth/react"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommentForm } from "./comment-form"
import { toast } from "sonner"

interface CommentItemProps {
  comment: {
    id: string
    content: string
    createdAt: string
    user: {
      id: string
      name: string
      image?: string
    }
  }
  postId: string
  onUpdate: (updatedComment: any) => void
  onDelete: (commentId: string) => void
}

export function CommentItem({ comment, postId, onUpdate, onDelete }: CommentItemProps) {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isAuthor = session?.user?.id === comment.user.id

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(
        `/api/posts/${postId}/comments/${comment.id}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }

      onDelete(comment.id)
      toast.success("Comment deleted successfully")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-4 rounded-lg border p-4">
        <CommentForm
          postId={postId}
          commentId={comment.id}
          initialContent={comment.content}
          onSuccess={(updatedComment) => {
            onUpdate(updatedComment)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {comment.user.image ? (
            <img
              src={comment.user.image}
              alt={comment.user.name}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              {comment.user.name[0]}
            </div>
          )}
          <div>
            <p className="font-medium">{comment.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={isDeleting}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
                disabled={isDeleting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p className="text-sm">{comment.content}</p>
    </div>
  )
} 