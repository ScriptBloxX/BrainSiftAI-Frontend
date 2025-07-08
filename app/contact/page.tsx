import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageSquare, GithubIcon } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch With Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" rows={6} />
                  </div>

                  <Button type="submit" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  You can also reach out to us directly using the contact information below.
                </p>

                <div className="space-y-6">
                  <ContactInfo
                    icon={<Mail className="h-6 w-6 text-primary" />}
                    title="Email Us"
                    content="support@brainsiftai.com"
                    description="For general inquiries and support"
                  />

                  <ContactInfo
                    icon={<Phone className="h-6 w-6 text-primary" />}
                    title="Call Us"
                    content="+66 123 456 789"
                    description="Monday to Friday, 9am to 5pm ICT"
                  />

                  <ContactInfo
                    icon={<MapPin className="h-6 w-6 text-primary" />}
                    title="Visit Us"
                    content="Bangkok, Thailand"
                    description="Our headquarters location"
                  />

                  <ContactInfo
                    icon={<MessageSquare className="h-6 w-6 text-primary" />}
                    title="Live Chat"
                    content="Available on our website"
                    description="Get instant help from our support team"
                  />
                </div>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Follow Us</CardTitle>
                    <CardDescription>Stay connected with us on social media</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <SocialButton href="https://www.instagram.com/9hodev/" label="Instagram">
                        <InstagramIcon className="h-5 w-5" />
                      </SocialButton>
                      <SocialButton href="https://github.com/ScriptBloxX" label="Instagram">
                        <GithubIcon className="h-5 w-5" />
                      </SocialButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <FaqItem
                question="How quickly can I expect a response to my inquiry?"
                answer="We typically respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using the live chat feature on our website for immediate assistance."
              />
              <FaqItem
                question="Do you offer phone support for technical issues?"
                answer="Yes, we provide phone support for technical issues for all paid plan subscribers. Free plan users can access support via email and our comprehensive help center."
              />
              <FaqItem
                question="Can I schedule a demo of the platform?"
                answer="We offer personalized demos for educators and institutions. Please fill out the contact form and select 'Demo Request' as the subject, and our team will reach out to schedule a convenient time."
              />
              <FaqItem
                question="How do I report a bug or suggest a feature?"
                answer="You can report bugs or suggest features through our contact form or by emailing support@brainsiftai.com. We value your feedback and continuously work to improve our platform based on user suggestions."
              />
              <FaqItem
                question="Do you offer special pricing for educational institutions?"
                answer="Yes, we offer special pricing for schools, colleges, and universities. Please contact our sales team for more information about our educational institution discounts."
              />
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>

            <div className="rounded-lg overflow-hidden shadow-xl border border-border h-[400px] bg-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium">Map</p>
                <p className="text-muted-foreground">Bangkok, Thailand</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ContactInfo({
  icon,
  title,
  content,
  description,
}: {
  icon: React.ReactNode
  title: string
  content: string
  description: string
}) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="font-medium">{content}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
    >
      {children}
    </a>
  )
}

function TwitterIcon({ className }: { className: string }) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className: string }) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className: string }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon({ className }: { className: string }) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-border pb-6">
      <h3 className="text-lg font-medium mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

