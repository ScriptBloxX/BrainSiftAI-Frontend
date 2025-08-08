import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileQuestion, BookOpen, Users, Settings, MessageSquare } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"
import Footer from "@/components/footer"

export default function HelpCenter() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How Can We Help You?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions about BrainSiftAI
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for help articles..." className="pl-10 py-6 text-lg" />
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Topics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <TopicCard
                icon={<FileQuestion className="h-8 w-8 text-primary" />}
                title="Creating Exams"
                description="Learn how to create and customize exams from your content"
                href="/help/creating-exams"
              />
              <TopicCard
                icon={<BookOpen className="h-8 w-8 text-primary" />}
                title="Content Management"
                description="Tips for uploading and managing your content effectively"
                href="/help/content-management"
              />
              <TopicCard
                icon={<Settings className="h-8 w-8 text-primary" />}
                title="Account Settings"
                description="Manage your account, billing, and notification preferences"
                href="/help/account-settings"
              />
              <TopicCard
                icon={<MessageSquare className="h-8 w-8 text-primary" />}
                title="Troubleshooting"
                description="Solutions to common issues and technical problems"
                href="/help/troubleshooting"
              />
              <TopicCard
                icon={<FileQuestion className="h-8 w-8 text-primary" />}
                title="FAQ"
                description="Answers to frequently asked questions about BrainSiftAI"
                href="/help/faq"
              />
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Browse Help Categories</h2>

            <Tabs defaultValue="getting-started" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="account">Account & Billing</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>

              <TabsContent value="getting-started" className="space-y-4">
                <HelpArticle
                  title="Creating your first exam"
                  description="Learn how to create your first exam using BrainSiftAI"
                  href="/help/creating-first-exam"
                />
                <HelpArticle
                  title="Setting up your account"
                  description="A guide to setting up your BrainSiftAI account"
                  href="/help/account-setup"
                />
                <HelpArticle
                  title="Uploading content"
                  description="How to upload PDF files and text content"
                  href="/help/uploading-content"
                />
                <HelpArticle
                  title="Inviting students"
                  description="How to invite students to take your exams"
                  href="/help/inviting-students"
                />
                <HelpArticle
                  title="Understanding the dashboard"
                  description="A guide to navigating your BrainSiftAI dashboard"
                  href="/help/dashboard-guide"
                />
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <HelpArticle
                  title="AI-generated questions"
                  description="How our AI generates questions from your content"
                  href="/help/ai-questions"
                />
                <HelpArticle
                  title="Content summaries"
                  description="Understanding and customizing content summaries"
                  href="/help/content-summaries"
                />
                <HelpArticle
                  title="Exam settings"
                  description="Customizing your exam settings and options"
                  href="/help/exam-settings"
                />
                <HelpArticle
                  title="Results and analytics"
                  description="Understanding exam results and analytics"
                  href="/help/results-analytics"
                />
              </TabsContent>

              <TabsContent value="account" className="space-y-4">
                <HelpArticle
                  title="Managing your subscription"
                  description="How to manage your BrainSiftAI subscription"
                  href="/help/subscription-management"
                />
                <HelpArticle
                  title="Billing and invoices"
                  description="Understanding your billing and accessing invoices"
                  href="/help/billing-invoices"
                />
                <HelpArticle
                  title="Changing your plan"
                  description="How to upgrade or downgrade your subscription plan"
                  href="/help/changing-plan"
                />
                <HelpArticle
                  title="Account security"
                  description="Best practices for securing your account"
                  href="/help/account-security"
                />
                <HelpArticle
                  title="Deleting your account"
                  description="How to delete your BrainSiftAI account"
                  href="/help/deleting-account"
                />
              </TabsContent>

              <TabsContent value="troubleshooting" className="space-y-4">
                <HelpArticle
                  title="PDF upload issues"
                  description="Troubleshooting problems with PDF uploads"
                  href="/help/pdf-upload-issues"
                />
                <HelpArticle
                  title="AI generation problems"
                  description="What to do when AI generation doesn't work as expected"
                  href="/help/ai-generation-problems"
                />
                <HelpArticle
                  title="Login and access issues"
                  description="Resolving login and account access problems"
                  href="/help/login-issues"
                />
                <HelpArticle
                  title="Payment problems"
                  description="Troubleshooting payment and billing issues"
                  href="/help/payment-problems"
                />
                <HelpArticle
                  title="Common error messages"
                  description="Understanding and resolving common error messages"
                  href="/help/error-messages"
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Our support team is ready to assist you with any questions or issues you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/help/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function TopicCard({
  icon,
  title,
  description,
  href,
}: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href={href}>
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function HelpArticle({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card className="hover:bg-secondary/10 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button asChild variant="ghost" size="icon">
            <Link href={href}>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
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

