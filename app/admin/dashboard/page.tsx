import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RecentInternships } from "@/components/dashboard/recent-internships"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Overview of internship portal activities",
}

async function getRecentInternships() {
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
      id,
      title,
      location,
      created_at,
      status,
      company:companies(name)
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching recent internships:', error)
    return []
  }

  return internships
}

export default async function AdminDashboardPage() {
  const recentInternships = await getRecentInternships()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard
        </p>
      </div>
      <div className="grid gap-6">
        <RecentInternships internships={recentInternships} />
        {/* Add more dashboard components here */}
      </div>
    </div>
  )
} 