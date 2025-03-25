import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import '../globals.css'

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Last updated: March 15, 2024</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="terms prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to BrainSiftAI. These Terms of Service ("Terms") govern your access to and use of the
                BrainSiftAI platform, including any websites, mobile applications, and services (collectively, the
                "Service") provided by BrainSiftAI, Inc. ("BrainSiftAI," "we," "us," or "our").
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these
                Terms, you may not access or use the Service.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                You must be at least 13 years of age to use the Service. If you are under 18 years of age, you represent
                that you have your parent or guardian's permission to use the Service and that they have read and agree
                to these Terms on your behalf.
              </p>
              <p>
                By using the Service, you represent and warrant that you have the right, authority, and capacity to
                enter into these Terms and to abide by all of the terms and conditions set forth herein.
              </p>

              <h2>3. Account Registration</h2>
              <p>
                To access certain features of the Service, you may be required to register for an account. When you
                register, you agree to provide accurate, current, and complete information about yourself and to update
                such information as necessary to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials and for all activities that occur under
                your account. You agree to notify us immediately of any unauthorized use of your account or any other
                breach of security.
              </p>

              <h2>4. User Content</h2>
              <p>
                The Service allows you to upload, submit, store, send, or receive content, including text, documents,
                and other materials (collectively, "User Content"). You retain ownership of any intellectual property
                rights that you hold in your User Content.
              </p>
              <p>
                By uploading, submitting, storing, sending, or receiving User Content to or through the Service, you
                grant BrainSiftAI a worldwide, non-exclusive, royalty-free license to use, host, store, reproduce,
                modify, create derivative works, communicate, publish, publicly perform, publicly display, and
                distribute such User Content for the limited purpose of providing and improving the Service.
              </p>
              <p>
                You represent and warrant that you have all rights, licenses, consents, and permissions necessary to
                grant the rights granted herein for any User Content that you submit.
              </p>

              <h2>5. Prohibited Conduct</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any applicable law, regulation, or these Terms</li>
                <li>Infringe the intellectual property rights of others</li>
                <li>
                  Upload, transmit, or distribute any content that is unlawful, harmful, threatening, abusive,
                  harassing, defamatory, vulgar, obscene, or otherwise objectionable
                </li>
                <li>
                  Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a
                  person or entity
                </li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                <li>
                  Attempt to gain unauthorized access to the Service, other accounts, computer systems, or networks
                  connected to the Service
                </li>
                <li>Use any robot, spider, scraper, or other automated means to access the Service</li>
                <li>Collect or harvest any personally identifiable information from the Service</li>
              </ul>

              <h2>6. Subscription and Payment</h2>
              <p>
                Some aspects of the Service may be provided for a fee. If you elect to use paid aspects of the Service,
                you agree to pay all applicable fees as described on the Service.
              </p>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis, depending on the subscription plan
                you select. Unless otherwise stated, subscriptions automatically renew for additional periods equal to
                the initial subscription term unless canceled before the renewal date.
              </p>
              <p>
                You may cancel your subscription at any time through your account settings or by contacting us. If you
                cancel, you will continue to have access to the paid features until the end of your current billing
                period, but you will not receive a refund for any fees already paid.
              </p>

              <h2>7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of BrainSiftAI and its licensors. The Service is protected by copyright, trademark, and other
                laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the
                prior written consent of BrainSiftAI.
              </p>

              <h2>8. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p>
                BRAINSIFTAI DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE
                CORRECTED, OR THAT THE SERVICE OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
                HARMFUL COMPONENTS.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                IN NO EVENT WILL BRAINSIFTAI, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
                OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
                CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICE, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
                INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
              </p>

              <h2>10. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless BrainSiftAI, its affiliates, licensors, and service
                providers, and its and their respective officers, directors, employees, contractors, agents, licensors,
                suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards,
                losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to
                your violation of these Terms or your use of the Service.
              </p>

              <h2>11. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or
                liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>

              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
                Service.
              </p>

              <h2>13. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of California,
                without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>

              <h2>14. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p>
                Email: legal@brainsiftai.com
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
                      <h3 className="text-lg font-medium mb-2">Privacy Policy</h3>
                      <p className="text-muted-foreground">
                        Learn about how we collect, use, and protect your personal information.
                      </p>
                      <Button asChild variant="link" className="px-0 mt-2">
                        <Link href="/privacy">View Privacy Policy</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Questions?</h3>
                      <p className="text-muted-foreground">
                        If you have any questions about our Terms of Service, please contact us.
                      </p>
                      <Button asChild variant="link" className="px-0 mt-2">
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

