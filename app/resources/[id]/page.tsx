"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Book, Download, FileText, ThumbsUp, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcePage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(124)

  // Mock data for a resource
  const resource = {
    id: params.id,
    title: "Algebra: Quadratic Equations",
    type: "note", // note, video, practice
    subject: "Mathematics",
    topic: "Algebra",
    description:
      "Comprehensive notes on solving quadratic equations, including the quadratic formula, completing the square, and factoring methods.",
    content: "This would be the actual content of the resource...",
    author: "Dr. Ramesh Sharma",
    dateUploaded: "2023-08-15",
    format: "PDF",
    fileSize: "2.4 MB",
    downloads: 1245,
    relatedResources: [
      { id: "r2", title: "Quadratic Equations Video Lecture", type: "video" },
      { id: "r3", title: "Quadratic Equations Practice Problems", type: "practice" },
      { id: "r4", title: "Algebra: Linear Equations", type: "note" },
    ],
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
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
              <Link href={`/subjects/mathematics`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href={`/subjects/mathematics`} className="text-sm text-muted-foreground hover:underline">
                  Mathematics
                </Link>
                <span className="text-sm text-muted-foreground">/</span>
                <Link href={`/subjects/mathematics#algebra`} className="text-sm text-muted-foreground hover:underline">
                  Algebra
                </Link>
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">{resource.title}</h1>
              <p className="text-muted-foreground">
                By {resource.author} • {resource.dateUploaded}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={liked ? "text-primary" : ""} onClick={handleLike}>
                <ThumbsUp className="h-4 w-4 mr-1" />
                {likeCount}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Content</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.type === "note" && (
                    <div className="rounded-lg border bg-muted/40 p-6">
                      <div className="aspect-[3/4] w-full bg-white rounded-md shadow-sm flex items-center justify-center">
                        <FileText className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Button>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  )}

                  {resource.type === "video" && (
                    <div className="rounded-lg overflow-hidden">
                      <div className="aspect-video bg-black flex items-center justify-center">
                        <Video className="h-16 w-16 text-white/70" />
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Button>
                          <Video className="h-4 w-4 mr-2" />
                          Play Video
                        </Button>
                      </div>
                    </div>
                  )}

                  {resource.type === "practice" && (
                    <div className="rounded-lg border p-6">
                      <h3 className="text-lg font-medium mb-4">Practice Problems</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <p className="font-medium">Problem 1</p>
                          <p className="mt-2">Solve the quadratic equation: x² + 5x + 6 = 0</p>
                          <Button variant="outline" className="mt-4">
                            View Solution
                          </Button>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p className="font-medium">Problem 2</p>
                          <p className="mt-2">Find the roots of the equation: 2x² - 7x + 3 = 0</p>
                          <Button variant="outline" className="mt-4">
                            View Solution
                          </Button>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p className="font-medium">Problem 3</p>
                          <p className="mt-2">Solve for x: x² - 9 = 0</p>
                          <Button variant="outline" className="mt-4">
                            View Solution
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resource Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Subject</dt>
                      <dd>{resource.subject}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Topic</dt>
                      <dd>{resource.topic}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                      <dd className="flex items-center gap-1">
                        {resource.type === "note" && <FileText className="h-4 w-4 text-blue-500" />}
                        {resource.type === "video" && <Video className="h-4 w-4 text-red-500" />}
                        {resource.type === "practice" && <Book className="h-4 w-4 text-green-500" />}
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </dd>
                    </div>
                    {resource.format && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Format</dt>
                        <dd>{resource.format}</dd>
                      </div>
                    )}
                    {resource.fileSize && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">File Size</dt>
                        <dd>{resource.fileSize}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Downloads</dt>
                      <dd>{resource.downloads.toLocaleString()}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Related Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resource.relatedResources.map((related) => (
                      <div key={related.id} className="flex items-start gap-2 rounded-lg border p-3">
                        {related.type === "note" && <FileText className="h-5 w-5 text-blue-500" />}
                        {related.type === "video" && <Video className="h-5 w-5 text-red-500" />}
                        {related.type === "practice" && <Book className="h-5 w-5 text-green-500" />}
                        <div>
                          <Link href={`/resources/${related.id}`} className="font-medium hover:underline">
                            {related.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {related.type.charAt(0).toUpperCase() + related.type.slice(1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
