import { Building2, ArrowRight } from "lucide-react"
import { getInternships } from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function SearchPage() {
  let internships = []
  let error = null

  try {
    internships = await getInternships()
    console.log('Fetched internships:', internships)
  } catch (e) {
    error = e
    console.error('Error fetching internships:', e)
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="h-12 w-12 text-destructive">⚠️</div>
          <h2 className="text-2xl font-semibold">Error Loading Internships</h2>
          <p className="text-muted-foreground">
            There was a problem loading the internships. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  if (!internships || internships.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">No Internships Available</h2>
          <p className="text-muted-foreground">
            There are no internships available at the moment. Please check back later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        {/* Header with Proceed Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Available Internships</h1>
            <p className="text-muted-foreground">
              Browse through all available internship opportunities from top companies
            </p>
          </div>
          <Link href="/user/internships">
            <Button size="lg" className="gap-2">
              <span>View All Internships</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Requirements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{internship.companies?.name}</span>
                      <span className="text-sm text-muted-foreground">{internship.companies?.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{internship.title}</span>
                      <span className="text-sm text-muted-foreground line-clamp-2">{internship.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>{internship.location}</TableCell>
                  <TableCell>{internship.type}</TableCell>
                  <TableCell>{internship.duration}</TableCell>
                  <TableCell>${internship.salary}/month</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      {internship.requirements.map((req: string, index: number) => (
                        <li key={index} className="line-clamp-1">{req}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 