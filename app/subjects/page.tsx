import Link from "next/link"
import { Book, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SubjectsPage() {
  const subjects = [
    {
      id: "mathematics",
      title: "Mathematics",
      description: "Algebra, Geometry, Arithmetic, and more",
      resources: 42,
      icon: "📐",
    },
    {
      id: "science",
      title: "Science",
      description: "Physics, Chemistry, Biology, and Astronomy",
      resources: 38,
      icon: "🔬",
    },
    {
      id: "english",
      title: "English",
      description: "Grammar, Literature, Writing, and Vocabulary",
      resources: 35,
      icon: "📚",
    },
    {
      id: "nepali",
      title: "Nepali",
      description: "व्याकरण, साहित्य, र लेखन",
      resources: 30,
      icon: "🇳🇵",
    },
    {
      id: "social-studies",
      title: "Social Studies",
      description: "History, Geography, Civics, and Economics",
      resources: 28,
      icon: "🌏",
    },
    {
      id: "computer-science",
      title: "Computer Science",
      description: "Programming, Hardware, Software, and Internet",
      resources: 25,
      icon: "💻",
    },
    {
      id: "optional-mathematics",
      title: "Optional Mathematics",
      description: "Advanced mathematical concepts and problem solving",
      resources: 22,
      icon: "🧮",
    },
    {
      id: "health-population",
      title: "Health & Population",
      description: "Human health, diseases, and population studies",
      resources: 20,
      icon: "🏥",
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
            <Input type="search" placeholder="Search for subjects, topics..." className="w-full pl-8" />
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">All Subjects</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Browse through our comprehensive collection of study materials for all SEE subjects.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for subjects..." className="w-full pl-8 md:hidden" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject) => (
              <Link key={subject.id} href={`/subjects/${subject.id}`}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="text-4xl mb-2">{subject.icon}</div>
                    <CardTitle>{subject.title}</CardTitle>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{subject.resources} learning resources available</p>
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
