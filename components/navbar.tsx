"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">BrainSiftAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground/70"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/explore"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/explore") ? "text-primary" : "text-foreground/70"}`}
            >
              Explore
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/pricing") ? "text-primary" : "text-foreground/70"}`}
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4">
            <Link
              href="/dashboard"
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground/70"}`}
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/explore"
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${isActive("/explore") ? "text-primary" : "text-foreground/70"}`}
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${isActive("/pricing") ? "text-primary" : "text-foreground/70"}`}
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login" onClick={toggleMenu}>
                  Log In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

