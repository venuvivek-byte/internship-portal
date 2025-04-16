"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

interface Company {
  id: string
  name: string
  logo_url: string
}

interface Internship {
  id: string
  title: string
  company: Company
  location: string
  duration: string
  stipend: string
  type: string
  description: string
  requirements: string
  mode: string
}

interface Application {
  userId: string
  internshipId: string
  status: 'pending' | 'accepted' | 'rejected'
  appliedAt: string
}

interface UserData {
  name: string
  email: string
  resume: string
  coverLetter: string
}

// Mock data
const MOCK_COMPANIES: Company[] = [
  {
    id: "1",
    name: "TechCorp",
    logo_url: "https://via.placeholder.com/150"
  },
  {
    id: "2",
    name: "InnovateSoft",
    logo_url: "https://via.placeholder.com/150"
  }
]

const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: MOCK_COMPANIES[0],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    description: "We are looking for a passionate Frontend Developer Intern...",
    requirements: "React, TypeScript, HTML, CSS, JavaScript",
    mode: "Remote"
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: MOCK_COMPANIES[1],
    location: "Mumbai, India",
    duration: "3 months",
    stipend: "₹20,000/month",
    type: "Full-time",
    description: "Join our backend development team as an intern...",
    requirements: "Node.js, Express, MongoDB, REST APIs",
    mode: "Hybrid"
  }
]

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [allInternships, setAllInternships] = useState<Internship[]>([])

  useEffect(() => {
    // Check if user is signed in
    const isSignedIn = localStorage.getItem('isSignedIn')
    if (!isSignedIn) {
      router.push('/admin/signin')
      return
    }

    // Load mock data
    try {
      setAllInternships(MOCK_INTERNSHIPS)

      // Create mock applications
      const mockApplications = [
        {
          userId: "user1",
          internshipId: MOCK_INTERNSHIPS[0].id,
          status: "pending",
          appliedAt: new Date().toISOString()
        },
        {
          userId: "user2",
          internshipId: MOCK_INTERNSHIPS[1].id,
          status: "accepted",
          appliedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]
      setApplications(mockApplications)
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }, [router])

  // Mock user data
  const mockUserData: Record<string, UserData> = {
    user1: {
      name: "John Doe",
      email: "john@example.com",
      resume: "path/to/resume1.pdf",
      coverLetter: "I am excited to apply for this position..."
    },
    user2: {
      name: "Jane Smith",
      email: "jane@example.com",
      resume: "path/to/resume2.pdf",
      coverLetter: "With my background in software development..."
    }
  }

  const filteredApplications = applications.filter(app => {
    const internship = allInternships.find(i => i.id === app.internshipId)
    const userData = mockUserData[app.userId]
    const searchLower = searchQuery.toLowerCase()
    
    return (
      internship?.title.toLowerCase().includes(searchLower) ||
      internship?.company.name.toLowerCase().includes(searchLower) ||
      userData.name.toLowerCase().includes(searchLower) ||
      userData.email.toLowerCase().includes(searchLower)
    )
  })

  const updateApplicationStatus = (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    setApplications(prev => 
      prev.map(app => 
        app.userId === applicationId ? { ...app, status: newStatus } : app
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications Dashboard</h1>
              <p className="text-gray-600">Manage and review internship applications</p>
            </div>
            <div className="relative flex-grow md:flex-grow-0 w-full md:w-64">
              <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => {
              const internship = allInternships.find(i => i.id === application.internshipId)
              const userData = mockUserData[application.userId]
              
              return (
                <div 
                  key={application.userId} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Applicant Info */}
                    <div className="flex-grow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icons.user className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                          <p className="text-gray-600">{userData.email}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Applied For</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center p-1.5 border border-gray-100">
                              {internship?.company.logo_url && (
                                <img 
                                  src={internship.company.logo_url} 
                                  alt={internship.company.name}
                                  className="w-full h-full object-contain"
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{internship?.title || "Unknown Position"}</p>
                              <p className="text-sm text-gray-600">{internship?.company.name || "Unknown Company"}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Cover Letter</h3>
                          <p className="text-gray-600 text-sm">{userData.coverLetter}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icons.clock className="w-4 h-4" />
                            <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              application.status === 'pending' ? 'bg-yellow-400' :
                              application.status === 'accepted' ? 'bg-green-400' :
                              'bg-red-400'
                            }`} />
                            <span className="text-sm capitalize">{application.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      <Button 
                        variant="outline"
                        className="w-full border-gray-200 hover:bg-gray-50"
                        onClick={() => window.open(userData.resume)}
                      >
                        <Icons.fileText className="w-4 h-4 mr-2" />
                        View Resume
                      </Button>
                      
                      {application.status === 'pending' && (
                        <>
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => updateApplicationStatus(application.userId, 'accepted')}
                          >
                            <Icons.check className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => updateApplicationStatus(application.userId, 'rejected')}
                          >
                            <Icons.x className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.search className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h2>
              <p className="text-gray-600">
                {searchQuery ? 
                  "Try adjusting your search query" : 
                  "No internship applications have been submitted yet"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 