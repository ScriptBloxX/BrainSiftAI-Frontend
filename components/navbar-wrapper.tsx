"use client"

import { Suspense } from "react"
import Navbar from "./navbar"

// Loading fallback for navbar
function NavbarFallback() {
  return (
    <header className="border-b border-border fixed w-full z-50 bg-background/95 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">BrainSiftAI</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <Navbar />
    </Suspense>
  )
}
