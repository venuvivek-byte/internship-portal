'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface ApplicationFormProps {
  id: string;
}

export default function ApplicationForm({ id }: ApplicationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    
    // Validate URLs before submission
    const resumeUrl = formData.get('resume')?.toString() || ''
    const portfolioUrl = formData.get('portfolio')?.toString() || ''
    
    try {
      // Basic URL validation
      if (resumeUrl && !isValidUrl(resumeUrl)) {
        throw new Error('Please enter a valid resume URL')
      }
      
      if (portfolioUrl && !isValidUrl(portfolioUrl)) {
        throw new Error('Please enter a valid portfolio URL')
      }

      const data = {
        internshipId: id,
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        resumeUrl: resumeUrl,
        coverLetter: formData.get('coverLetter')?.toString() || '',
        availability: "Immediate",
        portfolioUrl: portfolioUrl || undefined,
      }

      console.log("Submitting application data:", data)

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.text()
      console.log("Response status:", response.status)
      console.log("Response data:", responseData)

      if (!response.ok) {
        let errorMessage = 'Failed to submit application'
        try {
          const errorData = JSON.parse(responseData)
          errorMessage = Array.isArray(errorData) 
            ? errorData.map(e => e.message).join(', ')
            : errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = responseData || errorMessage
        }
        throw new Error(errorMessage)
      }

      toast.success('Application submitted successfully!')
      router.push('/internships')
    } catch (error) {
      console.error("Application error:", error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // URL validation helper
  function isValidUrl(urlString: string): boolean {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {error && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          minLength={1}
          className="mt-1"
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          className="mt-1"
          placeholder="Enter your email address"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
          Resume Link
        </label>
        <Input
          type="url"
          id="resume"
          name="resume"
          required
          className="mt-1"
          placeholder="Enter your resume link (Google Drive, Dropbox, etc.)"
        />
        <p className="text-sm text-gray-500">Please enter a complete URL (e.g., https://drive.google.com/...)</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
          Portfolio Link (Optional)
        </label>
        <Input
          type="url"
          id="portfolio"
          name="portfolio"
          className="mt-1"
          placeholder="Enter your portfolio link (if any)"
        />
        <p className="text-sm text-gray-500">Please enter a complete URL if providing a portfolio link</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
          Cover Letter
        </label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          required
          minLength={10}
          className="mt-1"
          placeholder="Write your cover letter here..."
          rows={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </motion.form>
  )
} 