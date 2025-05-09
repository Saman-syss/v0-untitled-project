import Link from "next/link"
import { ArrowLeft, Book, FileText, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subjectMap: Record<string, { title: string; description: string; icon: string }> = {
    mathematics: {
      title: "Mathematics",
      description: "Algebra, Geometry, Arithmetic, and more",
      icon: "📐",
    },
    science: {
      title: "Science",
      description: "Physics, Chemistry, Biology, and Astronomy",
      icon: "🔬",
    },
    english: {
      title: "English",
      description: "Grammar, Literature, Writing, and Vocabulary",
      icon: "📚",
    },
    nepali: {
      title: "Nepali",
      description: "व्याकरण, साहित्य, र लेखन",
      icon: "🇳🇵",
    },
    "social-studies": {
      title: "Social Studies",
      description: "History, Geography, Civics, and Economics",
      icon: "🌏",
    },
    "computer-science": {
      title: "Computer Science",
      description: "Programming, Hardware, Software, and Internet",
      icon: "💻",
    },
  }

  const subject = subjectMap[params.subject] || {
    title: "Subject Not Found",
    description: "This subject does not exist in our database",
    icon: "❓",
  }

  const topics = [
    {
      id: "topic-1",
      title: "Chapter 1: Introduction",
      description: "Foundational concepts and overview",
      resources: [
        { id: "r1", type: "note", title: "Introduction Notes", format: "PDF" },
        { id: "r2", type: "video", title: "Introduction Video Lecture", duration: "45 min" },
        { id: "r3", type: "practice", title: "Practice Problems Set 1", questions: 15 },
      ],
    },
    {
      id: "topic-2",
      title: "Chapter 2: Core Concepts",
      description: "Essential principles and theories",
      resources: [
        { id: "r4", type: "note", title: "Core Concepts Notes", format: "PDF" },
        { id: "r5", type: "video", title: "Core Concepts Video Lecture", duration: "52 min" },
        { id: "r6", type: "practice", title: "Practice Problems Set 2", questions: 20 },
      ],
    },
    {
      id: "topic-3",
      title: "Chapter 3: Advanced Topics",
      description: "In-depth exploration of complex ideas",
      resources: [
        { id: "r7", type: "note", title: "Advanced Topics Notes", format: "PDF" },
        { id: "r8", type: "video", title: "Advanced Topics Video Lecture", duration: "60 min" },
        { id: "r9", type: "practice", title: "Practice Problems Set 3", questions: 25 },
      ],
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
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <span className="text-4xl">{subject.icon}</span> {subject.title}
              </h1>
              <p className="text-muted-foreground">{subject.description}</p>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-6">
                {topics.map((topic) => (
                  <Card key={topic.id}>
                    <CardHeader>
                      <CardTitle>{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topic.resources.map((resource) => (
                          <div key={resource.id} className="flex items-start gap-2 rounded-lg border p-3">
                            {resource.type === "note" && <FileText className="h-5 w-5 text-blue-500" />}
                            {resource.type === "video" && <Video className="h-5 w-5 text-red-500" />}
                            {resource.type === "practice" && <Book className="h-5 w-5 text-green-500" />}
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                {resource.type === "note" && `Format: ${resource.format}`}
                                {resource.type === "video" && `Duration: ${resource.duration}`}
                                {resource.type === "practice" && `Questions: ${resource.questions}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href={`/topics/${topic.id}`}>View All Resources</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <div className="grid gap-6">
                {topics.map((topic) => (
                  <Card key={topic.id}>
                    <CardHeader>
                      <CardTitle>{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topic.resources
                          .filter((resource) => resource.type === "note")
                          .map((resource) => (
                            <div key={resource.id} className="flex items-start gap-2 rounded-lg border p-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <h3 className="font-medium">{resource.title}</h3>
                                <p className="text-xs text-muted-foreground">Format: {resource.format}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos" className="mt-4">
              <div className="grid gap-6">
                {topics.map((topic) => (
                  <Card key={topic.id}>
                    <CardHeader>
                      <CardTitle>{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topic.resources
                          .filter((resource) => resource.type === "video")
                          .map((resource) => (
                            <div key={resource.id} className="flex items-start gap-2 rounded-lg border p-3">
                              <Video className="h-5 w-5 text-red-500" />
                              <div>
                                <h3 className="font-medium">{resource.title}</h3>
                                <p className="text-xs text-muted-foreground">Duration: {resource.duration}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="practice" className="mt-4">
              <div className="grid gap-6">
                {topics.map((topic) => (
                  <Card key={topic.id}>
                    <CardHeader>
                      <CardTitle>{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topic.resources
                          .filter((resource) => resource.type === "practice")
                          .map((resource) => (
                            <div key={resource.id} className="flex items-start gap-2 rounded-lg border p-3">
                              <Book className="h-5 w-5 text-green-500" />
                              <div>
                                <h3 className="font-medium">{resource.title}</h3>
                                <p className="text-xs text-muted-foreground">Questions: {resource.questions}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
