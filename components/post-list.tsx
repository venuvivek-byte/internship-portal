import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Post } from "@/components/post"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PostListProps {
  initialPosts: {
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
  }[]
}

export function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { ref, inView } = useInView()

  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/posts?page=${page + 1}&limit=10`)
      const data = await response.json()

      if (data.posts.length === 0) {
        setHasMore(false)
        return
      }

      setPosts(prev => [...prev, ...data.posts])
      setPage(prev => prev + 1)
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inView) {
      loadMorePosts()
    }
  }, [inView])

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      <div
        ref={ref}
        className="flex justify-center py-4"
      >
        {isLoading && (
          <Button variant="ghost" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more posts...
          </Button>
        )}
      </div>
    </div>
  )
} 