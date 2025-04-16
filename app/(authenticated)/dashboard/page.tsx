import { auth } from "@/auth"
import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    const [applications, savedInternships] = await Promise.all([
      db.application.findMany({
        where: {
          user_id: session.user.id,
        },
        include: {
          internship: {
            include: {
              company: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      }),
      db.savedInternship.findMany({
        where: {
          user_id: session.user.id,
        },
        include: {
          internship: {
            include: {
              company: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      }),
    ]);

    return (
      <div className="container py-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Welcome back, {session.user.name || "User"}</h1>
          <p className="text-muted-foreground">
            Track your applications and saved internships
          </p>
        </div>

        <Tabs defaultValue="applications" className="mt-8">
          <TabsList>
            <TabsTrigger value="applications">
              Applications ({applications?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="saved">
              Saved Internships ({savedInternships?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="mt-4 space-y-4">
            {!applications?.length ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start applying to internships to track your applications here
                  </p>
                  <Button asChild>
                    <Link href="/internships">Browse Internships</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <CardTitle>{application.internship?.title || "Untitled Internship"}</CardTitle>
                    <CardDescription>
                      at {application.internship?.company?.name || "Unknown Company"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Applied {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                        </p>
                        <Badge variant={
                          application.status === "accepted" ? "success" :
                          application.status === "rejected" ? "destructive" :
                          "secondary"
                        }>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/internships/${application.internship_id}`}>
                          View Internship
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-4 space-y-4">
            {!savedInternships?.length ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <h3 className="text-lg font-semibold mb-2">No saved internships</h3>
                  <p className="text-muted-foreground mb-4">
                    Save internships to view them here later
                  </p>
                  <Button asChild>
                    <Link href="/internships">Browse Internships</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              savedInternships.map((saved) => (
                <Card key={saved.id}>
                  <CardHeader>
                    <CardTitle>{saved.internship?.title || "Untitled Internship"}</CardTitle>
                    <CardDescription>
                      at {saved.internship?.company?.name || "Unknown Company"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Saved {formatDistanceToNow(new Date(saved.created_at), { addSuffix: true })}
                      </p>
                      <Button variant="outline" asChild>
                        <Link href={`/internships/${saved.internship_id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Dashboard Error:", error);
    return (
      <div className="container py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-4">
              We're having trouble loading your dashboard. Please try again later.
            </p>
            <Button asChild>
              <Link href="/internships">Browse Internships</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
} 