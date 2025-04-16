"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MOCK_INTERNSHIPS, findInternshipById } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Building2, MapPin, CalendarDays, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function InternshipApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const internship = findInternshipById(params.id)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
    portfolio: "",
    github: "",
    linkedin: ""
  })

  if (!internship) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Internship Not Found</h1>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the application data to your backend
    // For now, we'll just simulate success
    toast.success("Application submitted successfully!")
    
    // Store in localStorage that we've applied
    const applied = localStorage.getItem('appliedInternships')
    const appliedInternships = new Set(applied ? JSON.parse(applied) : [])
    appliedInternships.add(internship.id)
    localStorage.setItem('appliedInternships', JSON.stringify(Array.from(appliedInternships)))
    
    // Redirect back to internships page
    router.push('/user/internships')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Internships
      </Button>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">{internship.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {internship.company.name}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {internship.location}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {internship.duration}
            </div>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {internship.requirements.split(", ").map((skill: string) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="bg-blue-100/80 text-blue-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume URL *</Label>
              <Input
                id="resume"
                required
                value={formData.resume}
                onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.value }))}
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                placeholder="Link to your portfolio website (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                value={formData.github}
                onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                placeholder="Your GitHub profile URL (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                placeholder="Your LinkedIn profile URL (optional)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter *</Label>
            <Textarea
              id="coverLetter"
              required
              value={formData.coverLetter}
              onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
              placeholder="Write a brief cover letter explaining why you're interested in this position"
              className="min-h-[200px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 