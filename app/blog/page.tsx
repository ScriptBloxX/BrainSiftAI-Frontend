import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">BrainSiftAI Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Insights, tips, and updates on AI-powered education and assessment
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10 py-6 text-lg" />
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-xl border border-border">
                <img src="/placeholder.svg?height=500&width=600" alt="AI in Education" className="w-full h-auto" />
              </div>
              <div>
                <Badge className="mb-4">Featured</Badge>
                <h2 className="text-3xl font-bold mb-4">The Future of AI in Education: Beyond Automated Grading</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>March 20, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Dr. Sarah Johnson</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>8 min read</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Artificial Intelligence is revolutionizing education in ways we couldn't have imagined just a few
                  years ago. While automated grading was an early application, today's AI systems are capable of much
                  more sophisticated educational support.
                </p>
                <Button asChild>
                  <Link href="/blog/future-of-ai-in-education">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="outline" size="sm">
                  Education
                </Button>
                <Button variant="outline" size="sm">
                  AI Technology
                </Button>
                <Button variant="outline" size="sm">
                  Assessment
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlogCard
                title="Creating Effective Multiple-Choice Questions: Best Practices"
                excerpt="Learn how to craft multiple-choice questions that accurately assess understanding and critical thinking skills."
                date="March 15, 2025"
                author="Michael Chen"
                category="Assessment"
                readTime="6 min read"
                image="/placeholder.svg?height=200&width=400"
                slug="creating-effective-multiple-choice-questions"
              />
              <BlogCard
                title="How AI is Personalizing Learning Experiences"
                excerpt="Discover how artificial intelligence is enabling truly personalized learning paths for students of all ages."
                date="March 10, 2025"
                author="Emily Rodriguez"
                category="AI Technology"
                readTime="5 min read"
                image="/placeholder.svg?height=200&width=400"
                slug="ai-personalizing-learning-experiences"
              />
              <BlogCard
                title="The Science of Knowledge Retention: Spaced Repetition"
                excerpt="Explore the research behind spaced repetition and how it can be implemented in your teaching strategy."
                date="March 5, 2025"
                author="Dr. James Wilson"
                category="Education"
                readTime="7 min read"
                image="/placeholder.svg?height=200&width=400"
                slug="science-of-knowledge-retention"
              />
              <BlogCard
                title="Using AI to Identify Knowledge Gaps in Students"
                excerpt="How intelligent assessment tools can help identify and address knowledge gaps more effectively."
                date="February 28, 2025"
                author="Aisha Patel"
                category="Assessment"
                readTime="4 min read"
                image="/placeholder.svg?height=200&width=400"
                slug="ai-identifying-knowledge-gaps"
              />
              <BlogCard
                title="The Ethics of AI in Educational Assessment"
                excerpt="Examining the ethical considerations and best practices for using AI in student assessment."
                date="February 20, 2025"
                author="Dr. Sarah Johnson"
                category="AI Technology"
                readTime="9 min read"
                image="/placeholder.svg?height=200&width=400"
                slug="ethics-of-ai-in-educational-assessment"
              />
              <BlogCard
                title="Designing Assessments for Different Learning Styles"
                excerpt="How to create inclusive assessments that accommodate visual, auditory, and kinesthetic learners."
                date="February 15, 2025"
                author="Maria Gonzalez"
                category="Education"
                readTime="6 min read"
                image="/placeholder.svg?height=200&width=400"
                slug="assessments-for-different-learning-styles"
              />
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <CategoryCard
                title="AI Technology"
                description="Advances in AI and their applications in educational settings"
                count={18}
                icon={<AIIcon className="h-8 w-8 text-primary" />}
                href="/blog/category/ai-technology"
              />
              <CategoryCard
                title="Assessment"
                description="Best practices for creating and administering effective assessments"
                count={15}
                icon={<AssessmentIcon className="h-8 w-8 text-primary" />}
                href="/blog/category/assessment"
              />
              <CategoryCard
                title="Case Studies"
                description="Real-world examples of AI implementation in education"
                count={9}
                icon={<CaseStudyIcon className="h-8 w-8 text-primary" />}
                href="/blog/category/case-studies"
              />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
              Stay updated with the latest articles, tips, and insights on AI-powered education and assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function BlogCard({
  title,
  excerpt,
  date,
  author,
  category,
  readTime,
  image,
  slug,
}: {
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  readTime: string
  image: string
  slug: string
}) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <Badge>{category}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">{excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto">
          <Link href={`/blog/${slug}`}>
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CategoryCard({
  title,
  description,
  count,
  icon,
  href,
}: {
  title: string
  description: string
  count: number
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
          <CardTitle className="mb-2">{title}</CardTitle>
          <CardDescription className="mb-4">{description}</CardDescription>
          <Badge variant="secondary">{count} articles</Badge>
          <Button asChild variant="ghost" className="mt-4">
            <Link href={href}>
              View Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom icons
function BookIcon({ className }: { className: string }) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  )
}

function AIIcon({ className }: { className: string }) {
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
      <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"></path>
      <path d="M17 6.18A10 10 0 0 1 18 10"></path>
      <path d="M7 6.18A10 10 0 0 0 6 10"></path>
      <path d="M12 6v4"></path>
      <path d="M12 13h.01"></path>
    </svg>
  )
}

function AssessmentIcon({ className }: { className: string }) {
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
      <path d="M9 11l3 3L22 4"></path>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  )
}

function CaseStudyIcon({ className }: { className: string }) {
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  )
}

