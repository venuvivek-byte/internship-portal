"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { getAllInternships } from "@/lib/mock-data"
import { useEffect, useState } from "react"
import type { Internship } from "@/lib/mock-data"

export default function AppliedInternshipsPage() {
  const [appliedInternships, setAppliedInternships] = useState<Internship[]>([])

  useEffect(() => {
    // Get applied internship IDs from localStorage
    const appliedIds = JSON.parse(localStorage.getItem('appliedInternships') || '[]')
    // Get all internships and filter for applied ones
    const allInternships = getAllInternships()
    const applied = allInternships.filter(internship => appliedIds.includes(internship.id))
    setAppliedInternships(applied)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link 
            href="/internships"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <Icons.arrowLeft className="w-4 h-4" />
            Back to all internships
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Applied Internships</h1>
        </div>
      </div>

      {appliedInternships.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.clipboardCheck className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h2>
          <p className="text-gray-600 mb-4">You haven't applied to any internships yet.</p>
          <Link href="/internships">
            <Button>Browse Internships</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedInternships.map((internship) => (
            <div 
              key={internship.id} 
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={internship.company.logo_url} 
                      alt={internship.company.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{internship.title}</h2>
                    <p className="text-sm text-gray-600">{internship.company.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                  <Icons.check className="w-4 h-4" />
                  <span>Applied</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.mapPin className="w-4 h-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.clock className="w-4 h-4" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.indianRupee className="w-4 h-4" />
                  <span>{internship.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.briefcase className="w-4 h-4" />
                  <span>{internship.type}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {internship.requirements.split(", ").map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-800 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4">
                <Link 
                  href={`/internships/${internship.id}`}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Posted 2 days ago</span>
                <span className="text-green-600">Application submitted</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 