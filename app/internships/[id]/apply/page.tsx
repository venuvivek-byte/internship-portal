"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { findInternshipById } from "@/lib/mock-data"

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const internship = findInternshipById(params.id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
    message: ""
  })

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.alertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Internship not found</h1>
          <p className="text-gray-600 mb-6">The internship you're looking for doesn't exist or has been removed.</p>
          <Link href="/internships">
            <Button className="bg-blue-600 hover:bg-blue-700">Browse Internships</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Store in localStorage
    const appliedIds = JSON.parse(localStorage.getItem('appliedInternships') || '[]')
    if (!appliedIds.includes(internship.id)) {
      const newAppliedIds = [...appliedIds, internship.id]
      localStorage.setItem('appliedInternships', JSON.stringify(newAppliedIds))
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)

    // Redirect after showing success animation
    setTimeout(() => {
      router.push('/internships/applied')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {showSuccess ? (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center scale-up-animation bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                <Icons.check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-1">Your application has been successfully submitted.</p>
              <p className="text-sm text-gray-500">Redirecting to your applications...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Link 
              href="/internships"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <Icons.arrowLeft className="w-4 h-4 mr-2" />
              Back to Internships
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Internship Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
                    <img 
                      src={internship.company.logo_url} 
                      alt={internship.company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{internship.title}</h1>
                    <p className="text-gray-600">{internship.company.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Icons.mapPin className="w-4 h-4" />
                      <span className="font-medium">Location</span>
                    </div>
                    <p className="text-sm text-gray-900">{internship.location}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Icons.clock className="w-4 h-4" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="text-sm text-gray-900">{internship.duration}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Icons.indianRupee className="w-4 h-4" />
                      <span className="font-medium">Stipend</span>
                    </div>
                    <p className="text-sm text-gray-900">{internship.stipend}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Icons.briefcase className="w-4 h-4" />
                      <span className="font-medium">Type</span>
                    </div>
                    <p className="text-sm text-gray-900">{internship.type}</p>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Resume Link
                  </label>
                  <Input
                    id="resume"
                    type="url"
                    required
                    value={formData.resume}
                    onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.value }))}
                    placeholder="Google Drive or Dropbox link to your resume"
                    className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter Link (Optional)
                  </label>
                  <Input
                    id="coverLetter"
                    type="url"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    placeholder="Google Drive or Dropbox link to your cover letter"
                    className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Why should we hire you? (Optional)
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us why you're the perfect candidate for this role..."
                    className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-300 min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Icons.spinner className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scale-up {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .scale-up-animation {
          animation: scale-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
} 