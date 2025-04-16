"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export type Internship = {
  id: string
  title: string
  company: { name: string }
  location: string
  stipend: string
  duration: string
  created_at: string
  status: "draft" | "published" | "archived"
}

async function deleteInternship(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('internships')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting internship:', error)
    throw error
  }
}

export const columns: ColumnDef<Internship>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <Link
            href={`/admin/internships/${row.original.id}`}
            className="font-medium hover:underline"
          >
            {row.getValue("title")}
          </Link>
          <span className="text-sm text-muted-foreground">
            {row.original.company.name}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "stipend",
    header: "Stipend",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "created_at",
    header: "Posted",
    cell: ({ row }) => {
      return formatDistanceToNow(new Date(row.getValue("created_at")), {
        addSuffix: true,
      })
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "published"
              ? "success"
              : status === "draft"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const internship = row.original
      const router = useRouter()

      const handleDelete = async () => {
        try {
          await deleteInternship(internship.id)
          toast.success("Internship deleted successfully")
          router.refresh()
        } catch (error) {
          toast.error("Failed to delete internship")
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/internships/${internship.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/internships/${internship.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 