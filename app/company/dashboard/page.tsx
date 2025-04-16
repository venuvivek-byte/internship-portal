import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Company Dashboard",
  description: "Manage your company profile and internship listings",
}

export default async function CompanyDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
          <p className="text-muted-foreground mb-4">
            Manage your company information and branding.
          </p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Internship Listings</h2>
          <p className="text-muted-foreground mb-4">
            Create and manage your internship opportunities.
          </p>
          <button className="btn btn-primary">Manage Listings</button>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <p className="text-muted-foreground mb-4">
            Review and manage internship applications.
          </p>
          <button className="btn btn-primary">View Applications</button>
        </div>
      </div>
    </div>
  )
} 