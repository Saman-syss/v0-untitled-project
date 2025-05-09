"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Book, FileText, LayoutDashboard, Upload, User, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function UploadPage() {
  const [resourceType, setResourceType] = useState("note")
  const [previewUrl, setPreviewUrl] = useState("")
  const [fileName, setFileName] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // In a real app, you would handle file upload and preview here
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle form submission here
    alert("Resource uploaded successfully!")
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
            <Button variant="ghost" size="sm">
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
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/upload"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground"
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
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Upload New Content</h1>
            </div>

            <Tabs defaultValue="note" onValueChange={setResourceType} className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="note" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Lectures
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Practice Problems
                </TabsTrigger>
              </TabsList>

              <TabsContent value="note" className="mt-4">
                <Card>
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle>Upload Notes</CardTitle>
                      <CardDescription>Upload PDF or DOC files for student notes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" placeholder="e.g., Algebra: Quadratic Equations" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select defaultValue="mathematics">
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="nepali">Nepali</SelectItem>
                              <SelectItem value="social-studies">Social Studies</SelectItem>
                              <SelectItem value="computer-science">Computer Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic</Label>
                          <Input id="topic" placeholder="e.g., Algebra" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="grade">Grade</Label>
                          <Select defaultValue="10">
                            <SelectTrigger id="grade">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8">Grade 8</SelectItem>
                              <SelectItem value="9">Grade 9</SelectItem>
                              <SelectItem value="10">Grade 10 (SEE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Provide a brief description of the content"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="file">Upload File (PDF, DOC)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="file"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="flex-1"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                        {fileName && <p className="text-sm text-muted-foreground mt-1">Selected file: {fileName}</p>}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                      <Button type="submit">Upload Notes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="video" className="mt-4">
                <Card>
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle>Upload Video Lecture</CardTitle>
                      <CardDescription>Add YouTube links or upload video files</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="video-title">Title</Label>
                          <Input id="video-title" placeholder="e.g., Introduction to Photosynthesis" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="video-subject">Subject</Label>
                          <Select defaultValue="science">
                            <SelectTrigger id="video-subject">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="nepali">Nepali</SelectItem>
                              <SelectItem value="social-studies">Social Studies</SelectItem>
                              <SelectItem value="computer-science">Computer Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="video-topic">Topic</Label>
                          <Input id="video-topic" placeholder="e.g., Biology" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="video-grade">Grade</Label>
                          <Select defaultValue="10">
                            <SelectTrigger id="video-grade">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8">Grade 8</SelectItem>
                              <SelectItem value="9">Grade 9</SelectItem>
                              <SelectItem value="10">Grade 10 (SEE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="video-description">Description</Label>
                        <Textarea
                          id="video-description"
                          placeholder="Provide a brief description of the video content"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Video Source</Label>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="youtube-url">YouTube URL</Label>
                            <Input id="youtube-url" placeholder="e.g., https://youtube.com/watch?v=..." />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="video-file">Or Upload Video File</Label>
                            <Input id="video-file" type="file" accept="video/*" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail Image (Optional)</Label>
                        <Input id="thumbnail" type="file" accept="image/*" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                      <Button type="submit">Upload Video</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="practice" className="mt-4">
                <Card>
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle>Upload Practice Problems</CardTitle>
                      <CardDescription>Create practice problems with solutions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="practice-title">Title</Label>
                          <Input id="practice-title" placeholder="e.g., Algebra Practice Set 1" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="practice-subject">Subject</Label>
                          <Select defaultValue="mathematics">
                            <SelectTrigger id="practice-subject">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="nepali">Nepali</SelectItem>
                              <SelectItem value="social-studies">Social Studies</SelectItem>
                              <SelectItem value="computer-science">Computer Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="practice-topic">Topic</Label>
                          <Input id="practice-topic" placeholder="e.g., Algebra" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="practice-grade">Grade</Label>
                          <Select defaultValue="10">
                            <SelectTrigger id="practice-grade">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8">Grade 8</SelectItem>
                              <SelectItem value="9">Grade 9</SelectItem>
                              <SelectItem value="10">Grade 10 (SEE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="practice-description">Description</Label>
                        <Textarea
                          id="practice-description"
                          placeholder="Provide a brief description of the practice problems"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Problems</Label>
                          <Button type="button" variant="outline" size="sm">
                            Add Problem
                          </Button>
                        </div>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">Problem 1</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="problem-text">Problem</Label>
                              <Textarea id="problem-text" placeholder="Enter the problem text" rows={2} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="solution-text">Solution</Label>
                              <Textarea id="solution-text" placeholder="Enter the solution" rows={2} required />
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">Problem 2</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="problem-text-2">Problem</Label>
                              <Textarea id="problem-text-2" placeholder="Enter the problem text" rows={2} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="solution-text-2">Solution</Label>
                              <Textarea id="solution-text-2" placeholder="Enter the solution" rows={2} required />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="practice-file">Upload File (Optional)</Label>
                        <Input id="practice-file" type="file" accept=".pdf,.doc,.docx" />
                        <p className="text-xs text-muted-foreground mt-1">
                          You can upload a file with additional problems or solutions
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                      <Button type="submit">Upload Practice Problems</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Preview how your content will appear to students</CardDescription>
              </CardHeader>
              <CardContent>
                {resourceType === "note" && (
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/40 p-8">
                    {previewUrl ? (
                      <div className="aspect-[3/4] w-full max-w-md bg-white rounded-md shadow-sm flex items-center justify-center">
                        <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-full" />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] w-full max-w-md bg-white rounded-md shadow-sm flex items-center justify-center">
                        <FileText className="h-16 w-16 text-muted-foreground" />
                        <p className="text-muted-foreground">PDF Preview</p>
                      </div>
                    )}
                  </div>
                )}

                {resourceType === "video" && (
                  <div className="rounded-lg overflow-hidden">
                    <div className="aspect-video bg-black flex items-center justify-center">
                      {previewUrl ? (
                        <video src={previewUrl} controls className="w-full h-full" />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Video className="h-16 w-16 text-white/70" />
                          <p className="text-white/70 mt-2">Video Preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {resourceType === "practice" && (
                  <div className="rounded-lg border p-6">
                    <h3 className="text-lg font-medium mb-4">Practice Problems Preview</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <p className="font-medium">Problem 1</p>
                        <p className="mt-2">Problem text will appear here</p>
                        <Button variant="outline" className="mt-4">
                          View Solution
                        </Button>
                      </div>
                      <div className="p-4 border rounded-md">
                        <p className="font-medium">Problem 2</p>
                        <p className="mt-2">Problem text will appear here</p>
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
        </main>
      </div>
    </div>
  )
}
