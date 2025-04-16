import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  User, Mail, Phone, MapPin, Building2, 
  GraduationCap, Calendar, Briefcase, Award 
} from "lucide-react"

export default function UserProfile() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Internship Portal</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link href="/internships" className="text-sm font-medium transition-colors hover:text-primary">
              Browse Internships
            </Link>
            <Link href="/user/applications" className="text-sm font-medium transition-colors hover:text-primary">
              My Applications
            </Link>
            <Link href="/user/profile" className="text-sm font-medium transition-colors hover:text-primary">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8 container">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="grid gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic profile information</CardDescription>
                  </div>
                  <Button>Edit Profile</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="grid gap-4 flex-1">
                    <div className="grid gap-2">
                      <Label>Full Name</Label>
                      <Input value="John Doe" readOnly />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <Input value="john.doe@example.com" readOnly />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <Input value="+1 (555) 123-4567" readOnly />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Location</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <Input value="San Francisco, CA" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your academic background</CardDescription>
                  </div>
                  <Button>Add Education</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <GraduationCap className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                        <p className="text-muted-foreground">Stanford University</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>2020 - 2024 (Expected)</span>
                        </div>
                        <p className="mt-2">GPA: 3.8/4.0</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Technical and professional skills</CardDescription>
                  </div>
                  <Button>Add Skills</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>JavaScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>Python</Badge>
                  <Badge>SQL</Badge>
                  <Badge>Git</Badge>
                  <Badge>AWS</Badge>
                  <Badge>Docker</Badge>
                  <Badge>Machine Learning</Badge>
                  <Badge>Data Analysis</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Experience</CardTitle>
                    <CardDescription>Work and project experience</CardDescription>
                  </div>
                  <Button>Add Experience</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Briefcase className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-semibold">Software Engineering Intern</h4>
                        <p className="text-muted-foreground">Google</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>June 2023 - September 2023</span>
                        </div>
                        <p className="mt-2">
                          Developed and maintained web applications using React and Node.js.
                          Collaborated with cross-functional teams to implement new features.
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Personal and academic projects</CardDescription>
                  </div>
                  <Button>Add Project</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Award className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-semibold">AI-Powered Task Manager</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>January 2024 - Present</span>
                        </div>
                        <p className="mt-2">
                          A task management application that uses AI to prioritize and categorize tasks.
                          Built with React, Python, and OpenAI API.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">Python</Badge>
                          <Badge variant="secondary">AI/ML</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resume */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resume</CardTitle>
                    <CardDescription>Upload and manage your resume</CardDescription>
                  </div>
                  <Button>Upload New</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 border rounded">PDF</div>
                    <div>
                      <h4 className="font-semibold">John_Doe_Resume.pdf</h4>
                      <p className="text-sm text-muted-foreground">Updated 2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Download</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 