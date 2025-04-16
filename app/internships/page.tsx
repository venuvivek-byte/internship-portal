"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { getAllInternships } from "@/lib/mock-data"
import { useEffect, useState } from "react"

export default function InternshipsPage() {
  const allInternships = getAllInternships()
  const [savedInternshipIds, setSavedInternshipIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('savedInternships') || '[]')
    setSavedInternshipIds(savedIds)
  }, [])

  const toggleSave = (internshipId: string) => {
    const newSavedIds = savedInternshipIds.includes(internshipId)
      ? savedInternshipIds.filter(id => id !== internshipId)
      : [...savedInternshipIds, internshipId]
    
    localStorage.setItem('savedInternships', JSON.stringify(newSavedIds))
    setSavedInternshipIds(newSavedIds)
  }

  const filteredInternships = allInternships.filter(internship => 
    internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Internship</h1>
              <p className="text-gray-600">Discover opportunities that match your interests and skills</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search internships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>
              <div className="flex items-center gap-3">
                <Link href="/internships/saved" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 border-gray-200 hover:bg-gray-50">
                    <Icons.bookmark className="w-4 h-4" />
                    <span className="whitespace-nowrap">Saved</span>
                  </Button>
                </Link>
                <Link href="/internships/applied" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 border-gray-200 hover:bg-gray-50">
                    <Icons.clipboardCheck className="w-4 h-4" />
                    <span className="whitespace-nowrap">Applied</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <div 
                key={internship.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col transform transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
                      <img 
                        src={internship.company.logo_url} 
                        alt={internship.company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{internship.title}</h2>
                      <p className="text-sm text-gray-600">{internship.company.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSave(internship.id)}
                    className={`flex-shrink-0 transition-colors ${
                      savedInternshipIds.includes(internship.id)
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    aria-label={savedInternshipIds.includes(internship.id) ? "Remove from saved" : "Save internship"}
                  >
                    <Icons.bookmark className={`w-5 h-5 ${
                      savedInternshipIds.includes(internship.id) ? "fill-current" : ""
                    }`} />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icons.mapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icons.clock className="w-4 h-4 flex-shrink-0" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icons.indianRupee className="w-4 h-4 flex-shrink-0" />
                    <span>{internship.stipend}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icons.briefcase className="w-4 h-4 flex-shrink-0" />
                    <span>{internship.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {internship.requirements.split(", ").map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <Link 
                    href={`/internships/${internship.id}`}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link href={`/internships/${internship.id}/apply`}>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      onClick={(e) => {
                        const appliedIds = JSON.parse(localStorage.getItem('appliedInternships') || '[]')
                        if (!appliedIds.includes(internship.id)) {
                          const newAppliedIds = [...appliedIds, internship.id]
                          localStorage.setItem('appliedInternships', JSON.stringify(newAppliedIds))
                        }
                      }}
                    >
                      Apply Now
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Posted 2 days ago</span>
                  <span className="flex items-center gap-1">
                    <Icons.eye className="w-4 h-4" />
                    {Math.floor(Math.random() * 100) + 50} views
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.search className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your search query or browse all internships</p>
                <Button 
                  onClick={() => setSearchQuery("")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View All Internships
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

