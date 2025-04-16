"use client"

import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Eye, Pencil } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { createClient } from '@/lib/supabase/client'

interface RecentInternship {
  id: string
  title: string
  company: {
    name: string
  }
  created_at: string
  location: string
  type: string
}

interface RecentInternshipsProps {
  internships: RecentInternship[]
}

export function RecentInternships({ internships }: RecentInternshipsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Internships</CardTitle>
        <CardDescription>
          Latest internship positions posted on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex flex-col space-y-1">
                <Link 
                  href={`/admin/internships/${internship.id}`}
                  className="font-medium hover:underline"
                >
                  {internship.title}
                </Link>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{internship.company.name}</span>
                  <span className="mx-2">•</span>
                  <span>{internship.location}</span>
                  <span className="mx-2">•</span>
                  <span>{internship.type}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {formatDistanceToNow(new Date(internship.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/admin/internships/${internship.id}`}>
                  <div className={buttonVariants({ variant: "ghost", size: "icon" })}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View internship</span>
                  </div>
                </Link>
                <Link href={`/admin/internships/${internship.id}/edit`}>
                  <div className={buttonVariants({ variant: "ghost", size: "icon" })}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit internship</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
          {internships.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No internships found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Example of how to fetch internships
async function getRecentInternships() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('internships')
    .select(`
      *,
      company:companies(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(5)
  
  if (error) {
    console.error('Error fetching internships:', error)
    return []
  }
  
  return data || []
} 