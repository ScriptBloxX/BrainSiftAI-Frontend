import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Users, Play, Clock } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"
import Footer from "@/components/footer"

export default function Tutorials() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Learn How to Use BrainSiftAI</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Step-by-step tutorials to help you get the most out of our platform
            </p>
            <Button asChild size="lg">
              <Link href="#getting-started">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Tutorial Categories */}
        <section className="py-20 px-4 md:px-6" id="getting-started">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="beginners" className="w-full">
              <TabsList className="grid grid-cols-1 sm:grid-cols-3 mb-8">
                <TabsTrigger value="beginners">For Beginners</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
                <TabsTrigger value="educators">For Educators</TabsTrigger>
              </TabsList>

              <TabsContent value="beginners" className="space-y-8">
                <h2 className="text-2xl font-bold mb-6">Getting Started with BrainSiftAI</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <TutorialCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Creating Your First Exam"
                    description="Learn how to create your first AI-generated exam in just a few minutes"
                    duration="5 min"
                    href="/tutorials/creating-first-exam"
                  />
                  <TutorialCard
                    icon={<BookOpen className="h-8 w-8 text-primary" />}
                    title="Uploading Content"
                    description="How to upload and process PDF documents and text content"
                    duration="4 min"
                    href="/tutorials/uploading-content"
                  />
                  <TutorialCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="Sharing Your Exams"
                    description="Learn how to share your exams with students and colleagues"
                    duration="3 min"
                    href="/tutorials/sharing-exams"
                  />
                  <TutorialCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Taking an Exam"
                    description="A guide to taking exams on the BrainSiftAI platform"
                    duration="6 min"
                    href="/tutorials/taking-exams"
                  />
                  <TutorialCard
                    icon={<BookOpen className="h-8 w-8 text-primary" />}
                    title="Understanding Results"
                    description="How to interpret exam results and performance metrics"
                    duration="5 min"
                    href="/tutorials/understanding-results"
                  />
                  <TutorialCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="Account Setup"
                    description="Setting up your profile and account preferences"
                    duration="4 min"
                    href="/tutorials/account-setup"
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-8">
                <h2 className="text-2xl font-bold mb-6">Advanced Features and Techniques</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <TutorialCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Custom Question Types"
                    description="How to create and customize different types of exam questions"
                    duration="8 min"
                    href="/tutorials/custom-question-types"
                  />
                  <TutorialCard
                    icon={<BookOpen className="h-8 w-8 text-primary" />}
                    title="Advanced Content Processing"
                    description="Tips for optimizing content for better AI-generated questions"
                    duration="7 min"
                    href="/tutorials/advanced-content-processing"
                  />
                  <TutorialCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Exam Analytics"
                    description="Deep dive into exam analytics and performance metrics"
                    duration="10 min"
                    href="/tutorials/exam-analytics"
                  />
                  <TutorialCard
                    icon={<BookOpen className="h-8 w-8 text-primary" />}
                    title="Content Libraries"
                    description="Creating and managing content libraries for reuse"
                    duration="6 min"
                    href="/tutorials/content-libraries"
                  />
                  <TutorialCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="API Integration"
                    description="Using the BrainSiftAI API for custom integrations"
                    duration="12 min"
                    href="/tutorials/api-integration"
                  />
                </div>
              </TabsContent>

              <TabsContent value="educators" className="space-y-8">
                <h2 className="text-2xl font-bold mb-6">Tutorials for Educators</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <TutorialCard
                    icon={<BookOpen className="h-8 w-8 text-primary" />}
                    title="Creating Effective Assessments"
                    description="Best practices for creating effective educational assessments"
                    duration="10 min"
                    href="/tutorials/effective-assessments"
                  />
                  <TutorialCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="Student Progress Tracking"
                    description="How to track and analyze student progress over time"
                    duration="7 min"
                    href="/tutorials/student-progress"
                  />
                  <TutorialCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Curriculum Planning"
                    description="Using BrainSiftAI for curriculum planning and development"
                    duration="9 min"
                    href="/tutorials/curriculum-planning"
                  />
                  <TutorialCard
                    icon={<BookOpen className="h-8 w-8 text-primary" />}
                    title="Differentiated Learning"
                    description="Creating exams for different learning levels and styles"
                    duration="8 min"
                    href="/tutorials/differentiated-learning"
                  />
                  <TutorialCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="Parent Communication"
                    description="Sharing results and progress with parents and guardians"
                    duration="6 min"
                    href="/tutorials/parent-communication"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Featured Tutorial */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Featured Tutorial</h2>
                <h3 className="text-2xl font-semibold mb-4">Creating Effective Assessments</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn how to create effective assessments that accurately measure student understanding and knowledge
                  retention.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Clock className="h-4 w-4" />
                  <span>10 min tutorial</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <TutorialListItem>Understanding assessment objectives</TutorialListItem>
                  <TutorialListItem>Balancing question difficulty</TutorialListItem>
                  <TutorialListItem>Creating clear and unambiguous questions</TutorialListItem>
                  <TutorialListItem>Measuring different cognitive levels</TutorialListItem>
                </ul>
                <Button asChild>
                  <Link href="/tutorials/effective-assessments">
                    <Play className="mr-2 h-4 w-4" /> Watch Tutorial
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl border border-border">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Creating Effective Assessments Tutorial"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Video Tutorials</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <VideoTutorial
                title="Getting Started with BrainSiftAI"
                duration="4:32"
                thumbnail="/placeholder.svg?height=200&width=350"
                href="/tutorials/videos/getting-started"
              />
              <VideoTutorial
                title="Creating Your First Exam"
                duration="6:15"
                thumbnail="/placeholder.svg?height=200&width=350"
                href="/tutorials/videos/first-exam"
              />
              <VideoTutorial
                title="Advanced Question Generation"
                duration="8:47"
                thumbnail="/placeholder.svg?height=200&width=350"
                href="/tutorials/videos/advanced-questions"
              />
              <VideoTutorial
                title="Analyzing Exam Results"
                duration="7:10"
                thumbnail="/placeholder.svg?height=200&width=350"
                href="/tutorials/videos/analyzing-results"
              />
              <VideoTutorial
                title="PDF Processing Tips"
                duration="5:58"
                thumbnail="/placeholder.svg?height=200&width=350"
                href="/tutorials/videos/pdf-tips"
              />
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/tutorials/videos">View All Video Tutorials</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
              Apply what you've learned and create your first AI-powered exam today.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/create-exam">Create Your First Exam</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function TutorialCard({
  icon,
  title,
  description,
  duration,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  href: string
}) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{duration} tutorial</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href={href}>
            View Tutorial <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function TutorialListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      </div>
      <p className="ml-3 text-base">{children}</p>
    </li>
  )
}

function VideoTutorial({
  title,
  duration,
  thumbnail,
  href,
}: {
  title: string
  duration: string
  thumbnail: string
  href: string
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto">
          <Link href={href}>
            Watch Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
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

function ArrowRight({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

