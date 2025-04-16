import { Metadata } from "next"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Admin | Internships",
  description: "Manage internships in the portal",
}

async function getInternships() {
  const supabase = createClient()
  
  const { data: session } = await supabase.auth.getSession()
  if (!session?.user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', session.user.id)
    .single()

  if (profile?.user_type !== 'admin') {
    redirect('/')
  }

  const { data: internships, error } = await supabase
    .from('internships')
    .select(`
      *,
      company:companies(name)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching internships:', error)
    return []
  }

  return internships
}

export default async function AdminInternshipsPage() {
  const internships = await getInternships()

  return (
    <>
      <div className="flex h-16 items-center border-b bg-background/95 px-4">
        <div className="flex items-center gap-6 text-sm">
          <Link href="/admin" className="font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/internships" className="font-medium text-primary">
            Internships
          </Link>
          <Link href="/admin/applications" className="font-medium transition-colors hover:text-primary">
            Applications
          </Link>
        </div>
      </div>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Internships</h1>
            <p className="text-muted-foreground">
              Manage and monitor internship listings
            </p>
          </div>
          <Link href="/admin/internships/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Internship
            </Button>
          </Link>
        </div>
        <DataTable columns={columns} data={internships} />
      </div>
    </>
  )
}

