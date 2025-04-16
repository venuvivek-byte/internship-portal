import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"

export default async function ApplicationsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  const applications = await prisma.application.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      
      {applications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't applied to any internships yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div 
              key={application.id} 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{application.name}</h2>
                  <p className="text-gray-600">{application.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  application.status === "PENDING" 
                    ? "bg-yellow-100 text-yellow-800"
                    : application.status === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {application.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-gray-700">Resume</h3>
                  <a 
                    href={application.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </div>
                
                {application.portfolioUrl && (
                  <div>
                    <h3 className="font-medium text-gray-700">Portfolio</h3>
                    <a 
                      href={application.portfolioUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Portfolio
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Cover Letter</h3>
                <p className="text-gray-600 mt-1">{application.coverLetter}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Availability</h3>
                <p className="text-gray-600 mt-1">{application.availability}</p>
              </div>

              {application.additionalInfo && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700">Additional Information</h3>
                  <p className="text-gray-600 mt-1">{application.additionalInfo}</p>
                </div>
              )}

              <div className="text-sm text-gray-500">
                Applied {formatDistanceToNow(new Date(application.createdAt))} ago
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 