"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Book, FileText, LayoutDashboard, Plus, Upload, User, Video, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials here
    setIsLoggedIn(true)
  }

  // Mock data for admin dashboard
  const stats = [
    { title: "Total Resources", value: "245", icon: FileText },
    { title: "Total Downloads", value: "12,456", icon: Download },
    { title: "Subjects", value: "8", icon: Book },
    { title: "Users", value: "1,245", icon: User },
  ]

  const recentUploads = [
    { id: "r1", title: "Algebra: Quadratic Equations", type: "note", date: "2023-08-15", subject: "Mathematics" },
    { id: "r2", title: "Newton's Laws of Motion", type: "video", date: "2023-08-14", subject: "Science" },
    { id: "r3", title: "English Grammar: Tenses", type: "note", date: "2023-08-12", subject: "English" },
    { id: "r4", title: "Nepali Vyakaran", type: "practice", date: "2023-08-10", subject: "Nepali" },
  ]

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Book className="h-6 w-6" />
              <span>SEE Nepal</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/subjects" className="text-sm font-medium">
                Subjects
              </Link>
              <Link href="/resources" className="text-sm font-medium">
                Resources
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Need an admin account?{" "}
                      <Link href="/admin/signup" className="text-primary hover:underline">
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">Only authorized administrators can access this area</p>
            </CardFooter>
          </Card>
        </main>
        <footer className="border-t bg-background">
          <div className="container py-6 px-4 md:px-6">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} SEE Nepal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Book className="h-6 w-6" />
            <span>SEE Nepal</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-12 items-center gap-2 px-4">
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Admin Dashboard</span>
            </div>
            <nav className="grid gap-1 px-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/upload"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Upload className="h-4 w-4" />
                Upload Content
              </Link>
              <Link
                href="/admin/resources"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <FileText className="h-4 w-4" />
                Manage Resources
              </Link>
              <Link
                href="/admin/subjects"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Book className="h-4 w-4" />
                Manage Subjects
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <User className="h-4 w-4" />
                Manage Users
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-6 md:px-6 md:py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Button asChild>
                <Link href="/admin/upload">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New Content
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="recent" className="mt-8">
              <TabsList>
                <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
                <TabsTrigger value="popular">Popular Resources</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Uploaded Resources</CardTitle>
                    <CardDescription>View and manage your most recently uploaded content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUploads.map((upload) => (
                        <div key={upload.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-start gap-3">
                            {upload.type === "note" && <FileText className="h-5 w-5 text-blue-500" />}
                            {upload.type === "video" && <Video className="h-5 w-5 text-red-500" />}
                            {upload.type === "practice" && <Book className="h-5 w-5 text-green-500" />}
                            <div>
                              <h3 className="font-medium">{upload.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                {upload.subject} • {upload.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Uploads
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="popular" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Resources</CardTitle>
                    <CardDescription>Your most downloaded and viewed content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Popular resources content would go here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>View detailed analytics about your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Analytics content would go here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
