import Link from "next/link"
import { Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Scale className="h-6 w-6" />
          <span>ClauseCraft AI</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/features" className="text-sm font-medium">
            Features
          </Link>
        </nav>
        <div>
          <Button asChild>
            <Link href="/analysis">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

