"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Users, Target, Clock, TrendingUp } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"
import Footer from "@/components/footer"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import axiosInstance from "@/lib/axios"

interface ServerStats {
  examsCount: number
  completionsCount: number
  usersCount: number
  uptime: number
  timestamp: string
}

export default function Home() {
  const [stats, setStats] = useState<ServerStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/api/server/info')
        setStats(response.data)
      } catch (error) {
        console.error('Failed to fetch server stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 min-h-screen flex items-center">
          <BackgroundBeamsWithCollision>
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Transform Your Content Into <span className="text-primary">Interactive Exams</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Upload your PDF documents or text content and let our AI generate customized exams and concise
                    summaries instantly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/dashboard">
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/explore">Explore Public Exams</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img
                      src="/brain.gif"
                      alt="BrainSiftAI Platform Preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundBeamsWithCollision>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-6 bg-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-muted-foreground">
                Thousands of users trust BrainSiftAI for their exam creation needs
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full animate-pulse"></div>
                    <div className="h-8 bg-muted rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : stats ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <StatCard
                  icon={<Target className="h-8 w-8 text-primary" />}
                  value={`${stats.examsCount}+`}
                  label="Exams Created"
                />
                <StatCard
                  icon={<TrendingUp className="h-8 w-8 text-primary" />}
                  value={`${stats.completionsCount}+`}
                  label="Exams Completed"
                />
                <StatCard
                  icon={<Users className="h-8 w-8 text-primary" />}
                  value={`${stats.usersCount}+`}
                  label="Active Users"
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Unable to load statistics
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, share, and take exams based on your content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="AI-Generated Exams"
                description="Upload PDFs or text content and our AI will automatically generate relevant exam questions."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Content Summaries"
                description="Get concise summaries of your content to review before taking the exam."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create and share exams in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StepCard number={1} title="Upload Content" description="Upload your PDF files or paste text content" />
              <StepCard
                number={2}
                title="AI Processing"
                description="Our AI analyzes your content and generates exam questions"
              />
              <StepCard
                number={3}
                title="Configure Settings"
                description="Choose public or private access for your exam"
              />
              <StepCard number={4} title="Share & Take" description="Share with others or take the exam yourself" />
            </div>
          </div>
        </section>

        {/* New CTA Section */}
        {/* <ThreeDMarqueeDemo></ThreeDMarqueeDemo> */}

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 relative">
          <div className="container mx-auto max-w-6xl z-10">
          {/* <ThreeDMarqueeDemo></ThreeDMarqueeDemo> */}
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of educators and students who are already using BrainSiftAI to create and take exams.
              </p>
              <Button asChild size="lg" variant="secondary" className="gap-2 z-20">
                <Link href="/signup">
                  Create Your First Exam <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number | string
  label: string
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

