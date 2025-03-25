import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileText } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Last updated: March 24, 2025</p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="privacy prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                At BrainSiftAI, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our platform. Please read this privacy policy
                carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>

              <h2>Information We Collect</h2>
              <p>We collect information that you provide directly to us when you:</p>
              <ul>
                <li>Register for an account</li>
                <li>Upload content for exam creation</li>
                <li>Create or take exams</li>
                <li>Communicate with us</li>
                <li>Subscribe to our services</li>
              </ul>
              <p>The types of information we may collect include:</p>
              <ul>
                <li>Personal identifiers (name, email address, phone number)</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Content you upload (PDFs, text documents)</li>
                <li>Exam data and results</li>
                <li>Communications with our team</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages and communications</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Provide customer service and technical support</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Personalize and improve your experience</li>
                <li>Develop new products and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>How We Share Your Information</h2>
              <p>We may share your personal information in the following situations:</p>
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                  service providers, contractors, or agents who perform services for us.
                </li>
                <li>
                  <strong>For Business Transfers:</strong> We may share or transfer your information in connection with,
                  or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                  portion of our business.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose
                  with your consent.
                </li>
                <li>
                  <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we
                  will require those affiliates to honor this Privacy Policy.
                </li>
                <li>
                  <strong>To Comply with Laws:</strong> We may disclose your information where required to do so by law
                  or subpoena.
                </li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the
                security of any personal information we process. However, despite our safeguards and efforts to secure
                your information, no electronic transmission over the Internet or information storage technology can be
                guaranteed to be 100% secure.
              </p>

              <h2>Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our service is not directed to children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and you are aware that your child
                has provided us with personal information, please contact us so that we can take necessary actions.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>

              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>
                Email: privacy@brainsiftai.com
                <br />
                Address: Bangkok, Thailand
                <br />
                Phone: +66 123 456 789
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Data Protection</h3>
                      <p className="text-muted-foreground">
                        Learn more about how we protect your data and maintain security.
                      </p>
                      <Button asChild variant="link" className="px-0 mt-2">
                        <Link href="/security">View Security Practices</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Terms of Service</h3>
                      <p className="text-muted-foreground">
                        Review our terms of service for information about using our platform.
                      </p>
                      <Button asChild variant="link" className="px-0 mt-2">
                        <Link href="/terms">View Terms of Service</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-xl font-medium mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about our privacy practices, please don't hesitate to contact us.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

