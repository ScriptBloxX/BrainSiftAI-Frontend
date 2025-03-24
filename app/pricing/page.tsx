import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that's right for you and start creating AI-powered exams today.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <Card className="flex flex-col border-border">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    $0
                    <span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">Perfect for trying out BrainSiftAI</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <PricingFeature>3 exams per week</PricingFeature>
                    <PricingFeature>Up to 20 questions per exam</PricingFeature>
                    <PricingFeature>Basic content summaries</PricingFeature>
                    <PricingFeature>Community support</PricingFeature>
                    <PricingFeatureDemotion>Private exams</PricingFeatureDemotion>
                    <PricingFeatureDemotion>Create classes</PricingFeatureDemotion>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="flex flex-col relative border-primary">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Smart Person
                  </span>
                </div>
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    $19
                    <span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">For educators and content creators</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <PricingFeature>Unlimited exams</PricingFeature>
                    <PricingFeature>Up to 50 questions per exam</PricingFeature>
                    <PricingFeature>Up to 5 classes</PricingFeature>
                    <PricingFeature>Advanced content summaries</PricingFeature>
                    <PricingFeature>Private exams and classes</PricingFeature>
                    <PricingFeature>PDF upload and processing</PricingFeature>
                    <PricingFeature>Priority support</PricingFeature>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="flex flex-col border-border">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    $49
                    <span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">For schools and organizations</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <PricingFeature>Everything in Pro</PricingFeature>
                    <PricingFeature>Unlimited classes</PricingFeature>
                    <PricingFeature>Maximum 150 questions per exam</PricingFeature>
                    <PricingFeature>Advanced analytics</PricingFeature>
                    <PricingFeature>API access</PricingFeature>
                    <PricingFeature>Dedicated support</PricingFeature>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 md:px-6 bg-secondary/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <FaqItem
                question="How does the billing work?"
                answer="We bill monthly or annually, with a discount for annual billing. You can upgrade, downgrade, or cancel your subscription at any time."
              />
              <FaqItem
                question="Can I upgrade or downgrade my plan?"
                answer="Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle."
              />
              <FaqItem
                question="Is there a free trial?"
                answer="Yes, all paid plans come with a 14-day free trial. No credit card required to start."
              />
              <FaqItem
                question="What payment methods do you accept?"
                answer="We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
              />
              <FaqItem
                question="Do you offer discounts for educational institutions?"
                answer="Yes, we offer special pricing for schools and universities. Please contact our sales team for more information."
              />
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  <Link href="/contact">Contact Sales</Link>
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

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0">
        <Check className="h-5 w-5 text-green-500" />
      </div>
      <p className="ml-3 text-base">{children}</p>
    </li>
  )
}
function PricingFeatureDemotion({ children }: { children: React.ReactNode }) {
    return (
      <li className="flex items-start">
        <div className="flex-shrink-0">
          <X className="h-5 w-5 text-red-500" />
        </div>
        <p className="ml-3 text-base">{children}</p>
      </li>
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

