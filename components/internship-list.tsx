import Link from "next/link"
import { CalendarDays, MapPin, Briefcase } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demonstration
const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    duration: "3 months",
    stipend: "$2000/month",
    field: "Software Development",
    description:
      "Join our team to build modern web applications using React, Next.js, and TypeScript. You'll work on real projects and gain valuable experience in frontend development.",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataWorks",
    location: "New York, NY",
    duration: "6 months",
    stipend: "$2500/month",
    field: "Data Science",
    description:
      "Work with our data science team to analyze large datasets, build predictive models, and extract meaningful insights using Python, pandas, and scikit-learn.",
  },
  {
    id: 3,
    title: "UX Design Intern",
    company: "DesignHub",
    location: "Remote",
    duration: "3 months",
    stipend: "$2200/month",
    field: "Design",
    description:
      "Collaborate with our design team to create user-centered designs, conduct user research, and develop prototypes for web and mobile applications.",
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "BrandBoost",
    location: "Remote",
    duration: "4 months",
    stipend: "$1800/month",
    field: "Marketing",
    description:
      "Assist our marketing team with social media management, content creation, email campaigns, and market research to drive brand awareness and engagement.",
  },
  {
    id: 5,
    title: "Backend Developer Intern",
    company: "ServerStack",
    location: "Austin, TX",
    duration: "6 months",
    stipend: "$2300/month",
    field: "Software Development",
    description:
      "Work on server-side applications using Node.js, Express, and PostgreSQL. You'll gain experience in API development, database design, and cloud deployment.",
  },
  {
    id: 6,
    title: "Business Analyst Intern",
    company: "StrategyPlus",
    location: "Chicago, IL",
    duration: "3 months",
    stipend: "$2100/month",
    field: "Business",
    description:
      "Support our consulting team with market research, data analysis, and business strategy development. You'll work with clients across various industries.",
  },
  {
    id: 7,
    title: "Machine Learning Intern",
    company: "AILabs",
    location: "Seattle, WA",
    duration: "6 months",
    stipend: "$2800/month",
    field: "Data Science",
    description:
      "Join our AI team to develop and implement machine learning models for real-world applications. Experience with Python and TensorFlow/PyTorch is preferred.",
  },
]

export default function InternshipList() {
  return (
    <div className="space-y-6">
      {internships.map((internship) => (
        <Card key={internship.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{internship.field}</Badge>
              <Badge variant="secondary">{internship.stipend}</Badge>
            </div>
            <CardTitle>{internship.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Briefcase className="mr-1 h-3 w-3" />
              {internship.company}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {internship.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <CalendarDays className="mr-1 h-3 w-3" />
                {internship.duration}
              </div>
            </div>
            <p className="line-clamp-2">{internship.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Save</Button>
            <Link href={`/internships/${internship.id}`}>
              <Button>View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

