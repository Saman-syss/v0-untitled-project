import type React from "react"
import Link from "next/link"
import { Book, FileText, Filter, Search, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResourcesPage() {
  // Mock data for resources
  const resources = [
    {
      id: "r1",
      title: "Algebra: Quadratic Equations",
      type: "note",
      subject: "Mathematics",
      topic: "Algebra",
      description: "Comprehensive notes on solving quadratic equations.",
      date: "2023-08-15",
      downloads: 1245,
    },
    {
      id: "r2",
      title: "Newton's Laws of Motion",
      type: "video",
      subject: "Science",
      topic: "Physics",
      description: "Video lecture explaining Newton's three laws of motion with examples.",
      date: "2023-08-14",
      views: 2356,
      duration: "45 min",
    },
    {
      id: "r3",
      title: "English Grammar: Tenses",
      type: "note",
      subject: "English",
      topic: "Grammar",
      description: "Notes on all English tenses with examples and exercises.",
      date: "2023-08-12",
      downloads: 987,
    },
    {
      id: "r4",
      title: "Nepali Vyakaran",
      type: "practice",
      subject: "Nepali",
      topic: "Grammar",
      description: "Practice problems for Nepali grammar and sentence structure.",
      date: "2023-08-10",
      questions: 30,
    },
    {
      id: "r5",
      title: "Trigonometry: Sine and Cosine Rules",
      type: "note",
      subject: "Mathematics",
      topic: "Trigonometry",
      description: "Notes on sine and cosine rules with applications.",
      date: "2023-08-08",
      downloads: 856,
    },
    {
      id: "r6",
      title: "Cell Structure and Function",
      type: "video",
      subject: "Science",
      topic: "Biology",
      description: "Video lecture on cell structure, organelles, and their functions.",
      date: "2023-08-05",
      views: 1890,
      duration: "38 min",
    },
    {
      id: "r7",
      title: "History of Nepal: Ancient Period",
      type: "note",
      subject: "Social Studies",
      topic: "History",
      description: "Comprehensive notes on ancient Nepali history.",
      date: "2023-08-03",
      downloads: 723,
    },
    {
      id: "r8",
      title: "Computer Programming Basics",
      type: "practice",
      subject: "Computer Science",
      topic: "Programming",
      description: "Practice problems for basic programming concepts.",
      date: "2023-08-01",
      questions: 25,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Book className="h-6 w-6" />
            <span>SEE Nepal</span>
          </Link>
          <div className="relative hidden w-full max-w-sm md:flex md:ml-4 md:mr-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for resources..." className="w-full pl-8" />
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/subjects" className="text-sm font-medium">
              Subjects
            </Link>
            <Link href="/resources" className="text-sm font-medium">
              Resources
            </Link>
            <Button asChild>
              <Link href="/admin">Admin Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Learning Resources</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Access all study materials, video lectures, and practice problems for SEE preparation.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for resources..." className="w-full pl-8 md:hidden" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-64 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Resource Type</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notes" />
                        <label
                          htmlFor="notes"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Notes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="videos" />
                        <label
                          htmlFor="videos"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Videos
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="practice" />
                        <label
                          htmlFor="practice"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Practice Problems
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="nepali">Nepali</SelectItem>
                        <SelectItem value="social-studies">Social Studies</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select defaultValue="newest">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="az">A-Z</SelectItem>
                        <SelectItem value="za">Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Resources</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  {resources
                    .filter((resource) => resource.type === "note")
                    .map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </TabsContent>

                <TabsContent value="videos" className="space-y-4">
                  {resources
                    .filter((resource) => resource.type === "video")
                    .map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </TabsContent>

                <TabsContent value="practice" className="space-y-4">
                  {resources
                    .filter((resource) => resource.type === "practice")
                    .map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-2">
                  Previous
                </Button>
                <Button variant="outline" className="mx-2">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
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

// Resource Card Component
function ResourceCard({ resource }: { resource: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 bg-muted flex items-center justify-center p-4">
          {resource.type === "note" && <FileText className="h-12 w-12 text-blue-500" />}
          {resource.type === "video" && <Video className="h-12 w-12 text-red-500" />}
          {resource.type === "practice" && <Book className="h-12 w-12 text-green-500" />}
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  <Link href={`/resources/${resource.id}`} className="hover:underline">
                    {resource.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {resource.subject} • {resource.topic} • {resource.date}
                </CardDescription>
              </div>
              <Badge
                variant={resource.type === "note" ? "default" : resource.type === "video" ? "destructive" : "outline"}
              >
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{resource.description}</p>
            <div className="mt-2 text-xs text-muted-foreground">
              {resource.type === "note" && `${resource.downloads} downloads`}
              {resource.type === "video" && `${resource.views} views • ${resource.duration}`}
              {resource.type === "practice" && `${resource.questions} questions`}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/resources/${resource.id}`}>View Resource</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}

// Label Component
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1.5">{children}</div>
}

// Checkbox Component
function Checkbox({ id }: { id: string }) {
  return <input type="checkbox" id={id} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
}

// Badge Component
function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline"
}) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </div>
  )
}
