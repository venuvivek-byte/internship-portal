"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { findInternshipById } from "@/lib/mock-data"

export default function InternshipDetailsPage({
  params
}: {
  params: { id: string }
}) {
  const internship = findInternshipById(params.id)

  if (!internship) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/internships"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <Icons.arrowLeft className="w-4 h-4 mr-2" />
            Back to internships
          </Link>
          <button className="text-gray-400 hover:text-gray-600">
            <Icons.bookmark className="w-5 h-5" />
            <span className="sr-only">Save internship</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={internship.company.logo_url} 
                alt={internship.company.name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{internship.title}</h1>
              <p className="text-lg text-gray-600">{internship.company.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">Location</h2>
              <div className="flex items-center gap-2">
                <Icons.mapPin className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{internship.location}</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">Type</h2>
              <div className="flex items-center gap-2">
                <Icons.briefcase className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{internship.type}</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">Duration</h2>
              <div className="flex items-center gap-2">
                <Icons.clock className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{internship.duration}</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">Mode</h2>
              <div className="flex items-center gap-2">
                <Icons.home className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{internship.mode}</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">Stipend</h2>
              <div className="flex items-center gap-2">
                <Icons.dollarSign className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{internship.stipend}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{internship.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {internship.requirements.split(", ").map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">Posted 2 days ago</p>
            <Button size="lg">Apply Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 