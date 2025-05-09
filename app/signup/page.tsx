import Link from "next/link"
import { Book } from "lucide-react"

import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
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
        <SignupForm />
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
