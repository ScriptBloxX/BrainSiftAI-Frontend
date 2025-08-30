import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Heart, Lightbulb, Globe } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"
import Footer from "@/components/footer"

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Our Mission is to Transform Education
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  At BrainSiftAI, we're dedicated to revolutionizing how educators create assessments and how students
                  learn. Our AI-powered platform makes it easy to generate high-quality exams from any content.
                </p>
                <Button asChild size="lg">
                  <Link href="/signup">Join Our Community</Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl border border-border">
                <img src="/about/part1.gif" alt="BrainSiftAI Team" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-8">
              BrainSiftAI was founded in 2025 by a team of educators who recognized the challenges of
              creating effective assessments. We saw how much time teachers spent creating exams and how difficult it
              was to ensure they accurately measured student understanding.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our solution combines cutting-edge AI technology with educational expertise to automatically generate
              relevant, high-quality exam questions from any content. What started as a simple tool has grown into a
              comprehensive platform used by many students worldwide.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to be at the forefront of educational technology, constantly innovating to make
              learning and assessment more effective, accessible, and engaging for everyone.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Lightbulb className="h-10 w-10 text-primary" />}
                title="Innovation"
                description="We constantly push the boundaries of what's possible with AI in education, developing new features and capabilities that make assessment more effective."
              />
              <ValueCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Accessibility"
                description="We believe quality education tools should be accessible to all. We design our platform to be intuitive, affordable, and available to educators everywhere."
              />
              <ValueCard
                icon={<Heart className="h-10 w-10 text-primary" />}
                title="Empathy"
                description="We understand the challenges educators face and design our solutions with empathy for their needs and the needs of their students."
              />
              <ValueCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Quality"
                description="We're committed to excellence in everything we do, from the accuracy of our AI-generated questions to the reliability of our platform."
              />
              <ValueCard
                icon={<Award className="h-10 w-10 text-primary" />}
                title="Integrity"
                description="We operate with honesty and transparency, respecting user privacy and maintaining the highest ethical standards in our use of AI technology."
              />
              <ValueCard
                icon={<Globe className="h-10 w-10 text-primary" />}
                title="Impact"
                description="We measure our success by the positive impact we have on education, helping teachers save time and students achieve better learning outcomes."
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 select-none">
              <TeamMember
                name="Somchai Wantaeng"
                role="CEO & Founder"
                image="/teams/Founder.png"
                bio="Dedicated to helping educators get the most out of the BrainSiftAI platform."
              />
              <TeamMember
                name="9hodev"
                role="Project Manager & Developer"
                image="/teams/PM.png"
                bio="Full-stack developer specializing in AI integration and user experience."
              />
              <TeamMember
                name="Script Blox"
                role="UX/UI Designer"
                image="/teams/Designer.png"
                bio="Designer focused on creating intuitive and accessible educational interfaces."
              />
              <TeamMember
                name="始まり"
                role="Marketing Director"
                image="/teams/Marketing.png"
                bio="EdTech marketing specialist with a background in digital strategy."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">What People Say About Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial
                quote="ช่วยให้การทบทวนเนื้อหาการเรียนและเตรียมตัวสอบ เป็นไปได้อย่างมีประสิทธิภาพและย่นเวลาลงมากๆ"
                author="Somchai W."
                role="SIT student"
                image="https://cdn-icons-png.flaticon.com/512/4123/4123757.png"
              />
              <Testimonial
                quote="ใช้ทบทวนความรู้ก่อนสอบได้ดีมากๆ"
                author="Satit A."
                role="SIT student"
                image="https://cdn-icons-png.flaticon.com/512/4123/4123757.png"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us in Transforming Education</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Experience the power of AI-assisted exam creation and join many students already using
                BrainSiftAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TeamMember({ name, role, image, bio }: { name: string; role: string; image: string; bio: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-primary font-medium mb-2">{role}</p>
      <p className="text-sm text-muted-foreground">{bio}</p>
    </div>
  )
}

function Testimonial({ quote, author, role, image }: { quote: string; author: string; role: string; image: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col">
          <p className="text-lg mb-6">"{quote}"</p>
          <div className="flex items-center mt-auto">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img src={image || "/placeholder.svg"} alt={author} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-semibold">{author}</h4>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

