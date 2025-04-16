import { useState } from "react"
import { useSession } from "next-auth/react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Trash2, Check, X } from "lucide-react"

interface CommentProps {
  comment: {
    id: string
    content: string
    createdAt: string
    user: {
      id: string
      name: string
      image: string | null
    }
  }
  onUpdate: (commentId: string, content: string) => Promise<void>
  onDelete: (commentId: string) => Promise<void>
}

export function Comment({ comment, onUpdate, onDelete }: CommentProps) {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  const [isLoading, setIsLoading] = useState(false)

  const isAuthor = session?.user?.id === comment.user.id

  const handleUpdate = async () => {
    if (editedContent.trim() === "") {
      toast.error("Comment cannot be empty")
      return
    }

    try {
      setIsLoading(true)
      await onUpdate(comment.id, editedContent)
      setIsEditing(false)
      toast.success("Comment updated successfully")
    } catch (error) {
      toast.error("Failed to update comment")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    try {
      setIsLoading(true)
      await onDelete(comment.id)
      toast.success("Comment deleted successfully")
    } catch (error) {
      toast.error("Failed to delete comment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <Avatar>
        <AvatarImage src={comment.user.image || undefined} />
        <AvatarFallback>
          {comment.user.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{comment.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </p>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                <Check className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditing(false)
                  setEditedContent(comment.content)
                }}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}
      </div>
    </div>
  )
} 