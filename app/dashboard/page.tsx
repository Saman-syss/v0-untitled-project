import { redirect } from "next/navigation"
import { Book, Bookmark, Clock, FileText, Video } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function DashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Get user's recent progress
  const { data: recentProgress } = await supabase
    .from("user_progress")
    .select("*, resources(*)")
    .eq("user_id", session.user.id)
    .order("last_accessed", { ascending: false })
    .limit(5)

  // Get user's bookmarks
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*, resources(*)")
    .eq("user_id", session.user.id)
    .limit(5)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Book className="h-6 w-6" />
            <span>SEE Nepal</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">Home</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/subjects">Subjects</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/resources">Resources</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/settings">Settings</a>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome, {profile?.full_name || "Student"}</h1>
              <p className="text-muted-foreground">Track your progress and access your learning materials.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Resources Viewed</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentProgress?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completed Resources</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentProgress?.filter((p) => p.completed).length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookmarks?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0h</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold">Recently Viewed</h2>
                {recentProgress && recentProgress.length > 0 ? (
                  <div className="grid gap-4">
                    {recentProgress.map((progress) => (
                      <Card key={progress.id}>
                        <div className="flex items-center p-4">
                          <div className="mr-4">
                            {progress.resources.type === "note" && <FileText className="h-8 w-8 text-blue-500" />}
                            {progress.resources.type === "video" && <Video className="h-8 w-8 text-red-500" />}
                            {progress.resources.type === "practice" && <Book className="h-8 w-8 text-green-500" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{progress.resources.title}</h3>
                            <p className="text-sm text-muted-foreground">{progress.progress_percentage}% complete</p>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${progress.progress_percentage}%` }}
                              />
                            </div>
                          </div>
                          <Button asChild size="sm" className="ml-4">
                            <a href={`/resources/${progress.resources.id}`}>
                              {progress.completed ? "Review" : "Continue"}
                            </a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>No recent activity</CardTitle>
                      <CardDescription>
                        You haven't viewed any resources yet. Start exploring our content!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <a href="/subjects">Browse Subjects</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="bookmarks" className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold">Your Bookmarks</h2>
                {bookmarks && bookmarks.length > 0 ? (
                  <div className="grid gap-4">
                    {bookmarks.map((bookmark) => (
                      <Card key={bookmark.id}>
                        <div className="flex items-center p-4">
                          <div className="mr-4">
                            {bookmark.resources.type === "note" && <FileText className="h-8 w-8 text-blue-500" />}
                            {bookmark.resources.type === "video" && <Video className="h-8 w-8 text-red-500" />}
                            {bookmark.resources.type === "practice" && <Book className="h-8 w-8 text-green-500" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{bookmark.resources.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {bookmark.resources.type.charAt(0).toUpperCase() + bookmark.resources.type.slice(1)}
                            </p>
                          </div>
                          <Button asChild size="sm" className="ml-4">
                            <a href={`/resources/${bookmark.resources.id}`}>View</a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>No bookmarks yet</CardTitle>
                      <CardDescription>
                        You haven't bookmarked any resources. Find content you like and bookmark it for easy access!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <a href="/resources">Browse Resources</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="recommended" className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold">Recommended for You</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized recommendations coming soon</CardTitle>
                    <CardDescription>
                      We're working on personalized recommendations based on your learning patterns.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <a href="/subjects">Browse All Subjects</a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SEE Nepal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
