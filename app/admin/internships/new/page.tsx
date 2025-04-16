import { Metadata } from "next"
import { InternshipForm } from "../internship-form"

export const metadata: Metadata = {
  title: "New Internship",
  description: "Create a new internship listing",
}

export default function NewInternshipPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">New Internship</h1>
          <p className="text-muted-foreground">
            Create a new internship listing for your company.
          </p>
        </div>
        <InternshipForm />
      </div>
    </div>
  )
} 