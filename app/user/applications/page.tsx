import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ApplicationsPage() {
  return (
    <main className="flex-1 py-8 container">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your internship applications
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
            <CardDescription>
              View and track the status of all your internship applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Example applications - replace with real data */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Software Engineering Intern</h4>
                  <p className="text-sm text-muted-foreground">TechCorp - Applied on Jan 15, 2024</p>
                </div>
                <Badge>Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Data Science Intern</h4>
                  <p className="text-sm text-muted-foreground">DataFlow Analytics - Applied on Jan 10, 2024</p>
                </div>
                <Badge>Interview Scheduled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Frontend Developer Intern</h4>
                  <p className="text-sm text-muted-foreground">Creative Design Co - Applied on Jan 5, 2024</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Accepted</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Machine Learning Intern</h4>
                  <p className="text-sm text-muted-foreground">AI Solutions Inc - Applied on Dec 28, 2023</p>
                </div>
                <Badge variant="destructive">Rejected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 