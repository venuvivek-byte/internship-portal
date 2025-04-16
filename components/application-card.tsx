import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ApplicationCardProps {
  application: {
    id: string
    status: string
    createdAt: Date
    internship: {
      id: string
      title: string
      company: {
        id: string
        name: string
        logo: string | null
      }
    }
  }
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const statusColors = {
    PENDING: "bg-yellow-500/10 text-yellow-500",
    ACCEPTED: "bg-green-500/10 text-green-500",
    REJECTED: "bg-red-500/10 text-red-500",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
          {application.internship.company.logo ? (
            <Image
              src={application.internship.company.logo}
              alt={application.internship.company.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <Link
            href={`/internships/${application.internship.id}`}
            className="font-semibold hover:underline"
          >
            {application.internship.title}
          </Link>
          <p className="text-sm text-muted-foreground">
            {application.internship.company.name}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={statusColors[application.status as keyof typeof statusColors]}
          >
            {application.status}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(application.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 