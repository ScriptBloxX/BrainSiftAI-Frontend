import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Users, Zap, Lock, BarChart3, FileUp, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Features() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Powerful Features for Exam Creation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover all the tools and capabilities that make BrainSiftAI the leading platform for AI-powered exam
              creation.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">Core Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="AI-Generated Exams"
                description="Upload PDFs or text content and our AI will automatically generate relevant exam questions tailored to your content."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Content Summaries"
                description="Get concise, AI-generated summaries of your content to help students review before taking the exam."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Instant Feedback"
                description="Students receive immediate results and feedback after completing exams to enhance learning."
              />
              <FeatureCard
                icon={<Lock className="h-10 w-10 text-primary" />}
                title="Privacy Controls"
                description="Choose between public and private exams with granular access controls for your content."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Performance Analytics"
                description="Track student performance with detailed analytics and insights on exam results."
              />
            </div>
          </div>
        </section>

        {/* Feature Spotlight */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Advanced PDF Processing</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our advanced AI can extract and understand content from any PDF document, making it easy to create
                  exams from your existing materials.
                </p>
                <ul className="space-y-4">
                  <FeatureListItem>
                    Upload any PDF document, including textbooks, research papers, and lecture notes
                  </FeatureListItem>
                  <FeatureListItem>AI automatically extracts and processes text content</FeatureListItem>
                  <FeatureListItem>
                    Generate questions that accurately reflect the content and difficulty level
                  </FeatureListItem>
                  <FeatureListItem>Create exams in minutes instead of hours</FeatureListItem>
                </ul>
                <Button className="mt-8" asChild>
                  <Link href="/create-exam">Try It Now</Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl border border-border">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="PDF Processing Feature"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ProcessStep
                number={1}
                icon={<FileUp className="h-8 w-8 text-primary" />}
                title="Upload Content"
                description="Upload your PDF files or paste text content directly into the platform."
              />
              <ProcessStep
                number={2}
                icon={<Search className="h-8 w-8 text-primary" />}
                title="AI Processing"
                description="Our AI analyzes your content and identifies key concepts and information."
              />
              <ProcessStep
                number={3}
                icon={<FileText className="h-8 w-8 text-primary" />}
                title="Generate Exam"
                description="The AI creates relevant questions and a comprehensive content summary."
              />
              <ProcessStep
                number={4}
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Share & Take"
                description="Share with your class or take the exam yourself to test your knowledge."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Exams?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of educators and students who are already using BrainSiftAI to create and take exams.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function FeatureListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-3 w-3 text-primary" />
        </div>
      </div>
      <p className="ml-3 text-base">{children}</p>
    </li>
  )
}

function Check({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ProcessStep({
  number,
  icon,
  title,
  description,
}: { number: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

