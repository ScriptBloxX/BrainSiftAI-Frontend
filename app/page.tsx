import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20">
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
                <div className="relative rounded-lg overflow-hidden shadow-2xl border border-border">
                  <img
                    src="/brain.gif"
                    alt="BrainSiftAI Platform Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Private Classes"
                description="Create private classes and invite specific users to take your exams."
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

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of educators and students who are already using BrainSiftAI to create and take exams.
              </p>
              <Button asChild size="lg" variant="secondary" className="gap-2">
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

