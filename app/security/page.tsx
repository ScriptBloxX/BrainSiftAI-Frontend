import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Database, Server, Users, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Security() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 mt-16">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-6">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Security at BrainSiftAI</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              How we protect your data, privacy, and maintain the security of our platform
            </p>
          </div>
        </section>

        {/* Security Overview */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Security Commitment</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              At BrainSiftAI, security is a top priority. We implement industry-leading security measures to protect
              your data and ensure the integrity of our platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <SecurityFeature
                icon={<Lock className="h-8 w-8 text-primary" />}
                title="Data Encryption"
                description="All data is encrypted both in transit and at rest using industry-standard encryption protocols."
              />
              <SecurityFeature
                icon={<Server className="h-8 w-8 text-primary" />}
                title="Secure Infrastructure"
                description="Our platform is built on secure, redundant infrastructure with continuous monitoring."
              />
              <SecurityFeature
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Access Controls"
                description="Strict access controls and authentication mechanisms protect your account and data."
              />
            </div>
          </div>
        </section>

        {/* Security Practices */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Security Practices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SecurityPractice>
                    <strong>Encryption:</strong> All data is encrypted using AES-256 encryption at rest and TLS 1.3 in
                    transit.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Data Isolation:</strong> Customer data is logically separated to prevent unauthorized
                    access.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Regular Backups:</strong> Automated backups are performed regularly with secure, encrypted
                    storage.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Data Retention:</strong> Clear policies on data retention and secure data deletion when
                    requested.
                  </SecurityPractice>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Infrastructure Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SecurityPractice>
                    <strong>Cloud Security:</strong> Hosted on secure cloud infrastructure with built-in protection
                    against DDoS attacks.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Network Security:</strong> Multiple layers of firewalls, intrusion detection, and prevention
                    systems.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Monitoring:</strong> 24/7 monitoring for suspicious activities and potential security
                    threats.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Redundancy:</strong> Redundant systems and failover mechanisms to ensure service
                    availability.
                  </SecurityPractice>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Access Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SecurityPractice>
                    <strong>Authentication:</strong> Strong password policies and multi-factor authentication options.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Authorization:</strong> Role-based access control with principle of least privilege.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Session Management:</strong> Secure session handling with automatic timeouts and
                    invalidation.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Admin Access:</strong> Strict controls on administrative access with audit logging.
                  </SecurityPractice>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Application Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SecurityPractice>
                    <strong>Secure Development:</strong> Secure coding practices and regular security code reviews.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Vulnerability Testing:</strong> Regular penetration testing and vulnerability assessments.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Dependency Management:</strong> Regular updates of all dependencies to address security
                    vulnerabilities.
                  </SecurityPractice>
                  <SecurityPractice>
                    <strong>Bug Bounty:</strong> Security researcher program to identify and address potential
                    vulnerabilities.
                  </SecurityPractice>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Compliance and Certifications</h2>

            <div className="flex justify-center">
              <ComplianceCard
                title="GDPR Compliance"
                description="We adhere to the General Data Protection Regulation requirements for EU data subjects."
                icon={<EUIcon className="h-16 w-16" />}
              />
              {/* <ComplianceCard
                title="SOC 2 Type II"
                description="Our platform has been audited and certified for security, availability, and confidentiality."
                icon={<SOCIcon className="h-16 w-16" />}
              />
              <ComplianceCard
                title="FERPA Compliance"
                description="We follow the Family Educational Rights and Privacy Act guidelines for educational data."
                icon={<EducationIcon className="h-16 w-16" />}
              /> */}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                We continuously review and update our security practices to maintain compliance with industry standards
                and regulations.
              </p>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us About Compliance</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Security FAQ */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Security FAQ</h2>

            <div className="space-y-6">
              <SecurityFaq
                question="How is my data protected on BrainSiftAI?"
                answer="Your data is protected through multiple layers of security, including encryption both in transit and at rest, secure infrastructure, access controls, and regular security audits. We implement industry-standard security measures to ensure the confidentiality and integrity of your information."
              />
              <SecurityFaq
                question="Who has access to my content and exam data?"
                answer="Access to your content and exam data is strictly limited to you and users you explicitly grant access to (such as students or colleagues you invite). Our staff has limited access to data on a need-to-know basis for support purposes, and all access is logged and monitored."
              />
              <SecurityFaq
                question="What happens to my data if I delete my account?"
                answer="When you delete your account, we initiate a secure data deletion process. Your personal information and content are permanently removed from our active systems within 30 days. Backup data is also purged according to our retention schedule."
              />
              <SecurityFaq
                question="Does BrainSiftAI use my content to train AI models?"
                answer="No, we do not use your uploaded content or exam data to train our AI models. Your content remains private and is only used to generate exams and summaries for your specific use cases as requested by you."
              />
              <SecurityFaq
                question="How do you handle security incidents?"
                answer="We have a comprehensive incident response plan in place. In the event of a security incident, we quickly identify and contain the issue, investigate the cause, remediate any vulnerabilities, and notify affected users as required by applicable laws and regulations."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Security Questions?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Our security team is available to address any questions or concerns you may have about our security
                practices.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Our Security Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="p-3 rounded-full bg-primary/10 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function SecurityPractice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>
      <p className="ml-3 text-base">{children}</p>
    </div>
  )
}

function ComplianceCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function SecurityFaq({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-border pb-6">
      <h3 className="text-lg font-medium mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

// Placeholder icons for compliance section
function EUIcon({ className }: { className: string }) {
  return (
    <div className={`flex items-center justify-center bg-primary/10 rounded-full p-4 ${className}`}>
      <span className="text-2xl font-bold text-primary">GDPR</span>
    </div>
  )
}

function SOCIcon({ className }: { className: string }) {
  return (
    <div className={`flex items-center justify-center bg-primary/10 rounded-full p-4 ${className}`}>
      <span className="text-2xl font-bold text-primary">SOC 2</span>
    </div>
  )
}

function EducationIcon({ className }: { className: string }) {
  return (
    <div className={`flex items-center justify-center bg-primary/10 rounded-full p-4 ${className}`}>
      <span className="text-2xl font-bold text-primary">FERPA</span>
    </div>
  )
}

