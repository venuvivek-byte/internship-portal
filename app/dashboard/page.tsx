import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  const [
    applications,
    savedInternships,
    internships
  ] = await Promise.all([
    prisma.application.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        internship: {
          include: {
            company: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    }),
    prisma.savedInternship.findMany({
      where: {
        user_id: session.user.id
      },
      include: {
        internship: {
          include: {
            company: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 5
    }),
    prisma.internship.findMany({
      include: {
        company: true,
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        applications: {
          _count: 'desc'
        }
      },
      take: 5
    })
  ])

  const stats = {
    totalApplications: await prisma.application.count({
      where: {
        userId: session.user.id
      }
    }),
    savedInternships: await prisma.savedInternship.count({
      where: {
        user_id: session.user.id
      }
    }),
    pendingApplications: await prisma.application.count({
      where: {
        userId: session.user.id,
        status: "PENDING"
      }
    }),
    acceptedApplications: await prisma.application.count({
      where: {
        userId: session.user.id,
        status: "ACCEPTED"
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Applications</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalApplications}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Saved Internships</h2>
          <p className="text-3xl font-bold text-green-600">{stats.savedInternships}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pending Applications</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingApplications}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Accepted Applications</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.acceptedApplications}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link href="/applications">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            {applications.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No applications yet
              </div>
            ) : (
              <div className="divide-y">
                {applications.map((application) => (
                  <div key={application.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{application.internship.title}</h3>
                        <p className="text-sm text-gray-600">{application.internship.company.name}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        application.status === "PENDING" 
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Saved Internships</h2>
            <Link href="/internships/saved">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            {savedInternships.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No saved internships yet
              </div>
            ) : (
              <div className="divide-y">
                {savedInternships.map((saved) => (
                  <div key={saved.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{saved.internship.title}</h3>
                        <p className="text-sm text-gray-600">{saved.internship.company.name}</p>
                      </div>
                      <Link href={`/internships/${saved.internship.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Popular Internships</h2>
          <Link href="/internships">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {internships.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No internships available
            </div>
          ) : (
            <div className="divide-y">
              {internships.map((internship) => (
                <div key={internship.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{internship.title}</h3>
                      <p className="text-sm text-gray-600">{internship.company.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {internship._count.applications} applications
                      </p>
                    </div>
                    <Link href={`/internships/${internship.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 