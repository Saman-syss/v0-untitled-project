import Link from "next/link"
import { Book, FileText, Search, Video } from "lucide-react"

import { UserNav } from "@/components/auth/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getSubjects } from "@/lib/api/subjects"

export default async function Home() {
  // Fetch subjects from the database
  let subjects = []
  try {
    subjects = await getSubjects()
  } catch (error) {
    console.error("Error fetching subjects:", error)
    // Use fallback data if database fetch fails
    subjects = [
      {
        id: "mathematics",
        name: "Mathematics",
        description: "Algebra, Geometry, Arithmetic, and more",
        icon: "📐",
        slug: "mathematics",
      },
      {
        id: "science",
        name: "Science",
        description: "Physics, Chemistry, Biology, and Astronomy",
        icon: "🔬",
        slug: "science",
      },
      {
        id: "english",
        name: "English",
        description: "Grammar, Literature, Writing, and Vocabulary",
        icon: "📚",
        slug: "english",
      },
      {
        id: "nepali",
        name: "Nepali",
        description: "व्याकरण, साहित्य, र लेखन",
        icon: "🇳🇵",
        slug: "nepali",
      },
      {
        id: "social-studies",
        name: "Social Studies",
        description: "History, Geography, Civics, and Economics",
        icon: "🌏",
        slug: "social-studies",
      },
      {
        id: "computer-science",
        name: "Computer Science",
        description: "Programming, Hardware, Software, and Internet",
        icon: "💻",
        slug: "computer-science",
      },
    ]
  }

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
            <Input type="search" placeholder="Search for subjects, topics..." className="w-full pl-8" />
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/subjects" className="text-sm font-medium">
              Subjects
            </Link>
            <Link href="/resources" className="text-sm font-medium">
              Resources
            </Link>
            <UserNav />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn for SEE Exams with Confidence
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Free study materials, video lectures, and practice problems for SEE students in Nepal.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search for subjects, topics..." className="w-full pl-8 md:hidden" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore Subjects</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Browse through our comprehensive collection of study materials for all SEE subjects.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {subjects.map((subject) => (
                <Link key={subject.id} href={`/subjects/${subject.slug}`}>
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="text-4xl mb-2">{subject.icon}</div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>{subject.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Learning resources available</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">
                        Explore Subject
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Study Resources for SEE Success</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our platform provides comprehensive study materials designed specifically for SEE students in Nepal.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/subjects">Browse Subjects</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/resources">View All Resources</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Subject-wise Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive notes for all SEE subjects, organized by chapter and topic.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <Video className="h-8 w-8 text-primary" />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Video Lectures</h3>
                    <p className="text-sm text-muted-foreground">
                      Watch expert teachers explain complex concepts in simple, easy-to-understand videos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <Book className="h-8 w-8 text-primary" />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Practice Problems</h3>
                    <p className="text-sm text-muted-foreground">
                      Test your knowledge with practice problems and past SEE exam questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Book className="h-6 w-6" />
              <span>SEE Nepal</span>
            </Link>
            <p className="text-sm text-muted-foreground">Helping SEE students in Nepal achieve academic excellence.</p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Subjects</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/subjects/mathematics" className="hover:underline">
                    Mathematics
                  </Link>
                </li>
                <li>
                  <Link href="/subjects/science" className="hover:underline">
                    Science
                  </Link>
                </li>
                <li>
                  <Link href="/subjects/english" className="hover:underline">
                    English
                  </Link>
                </li>
                <li>
                  <Link href="/subjects/nepali" className="hover:underline">
                    Nepali
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/resources?type=note" className="hover:underline">
                    Notes
                  </Link>
                </li>
                <li>
                  <Link href="/resources?type=video" className="hover:underline">
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="/resources?type=practice" className="hover:underline">
                    Practice
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} SEE Nepal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
