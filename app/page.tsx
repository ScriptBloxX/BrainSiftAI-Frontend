"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Users, Target, Clock, TrendingUp } from "lucide-react"
import NavbarWrapper from "@/components/navbar-wrapper"
import Footer from "@/components/footer"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import axiosInstance from "@/lib/axios"
import { motion } from "framer-motion"

interface ServerStats {
  examsCount: number
  completionsCount: number
  usersCount: number
  uptime: number
  timestamp: string
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export default function Home() {
  const [stats, setStats] = useState<ServerStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/api/server/info')
        setStats(response.data)
      } catch (error) {
        console.error('Failed to fetch server stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20 min-h-screen flex items-center">
          <BackgroundBeamsWithCollision>
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div 
                  className="flex-1 space-y-6"
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold tracking-tight"
                    variants={fadeInUp}
                  >
                    Transform Your Content Into <span className="text-primary">Interactive Exams</span>
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-muted-foreground"
                    variants={fadeInUp}
                  >
                    Upload your PDF documents or text content and let our AI generate customized exams and concise
                    summaries instantly.
                  </motion.p>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                    variants={fadeInUp}
                  >
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/dashboard">
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/explore">Explore Public Exams</Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="flex-1"
                  initial="initial"
                  animate="animate"
                  variants={fadeInRight}
                >
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img
                      src="/brain.gif"
                      alt="BrainSiftAI Platform Preview"
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </BackgroundBeamsWithCollision>
        </section>

        {/* Stats Section */}
        <motion.section 
          className="py-16 px-4 md:px-6 bg-secondary/10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-muted-foreground">
                Trusted by countless learners and educators, BrainSiftAI crafts meticulously tailored exams from your content.
              </p>
            </motion.div>
            
            {isLoading ? (
              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" variants={fadeInUp}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full animate-pulse"></div>
                    <div className="h-8 bg-muted rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </motion.div>
            ) : stats ? (
              <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6" variants={fadeInUp}>
                <StatCard
                  icon={<Target className="h-8 w-8 text-primary" />}
                  value={`${stats.examsCount}+`}
                  label="Exams Created"
                />
                <StatCard
                  icon={<TrendingUp className="h-8 w-8 text-primary" />}
                  value={`${stats.completionsCount}+`}
                  label="Exams Completed"
                />
                <StatCard
                  icon={<Users className="h-8 w-8 text-primary" />}
                  value={`${stats.usersCount}+`}
                  label="Active Users"
                />
              </motion.div>
            ) : (
              <motion.div className="text-center text-muted-foreground" variants={fadeInUp}>
                Unable to load statistics
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="py-20 px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, share, and take exams based on your content
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerContainer}>
              <motion.div variants={fadeInLeft}>
                <FeatureCard
                  icon={<FileText className="h-10 w-10 text-primary" />}
                  title="AI-Generated Exams"
                  description="Upload PDFs or text content and our AI will automatically generate relevant exam questions."
                />
              </motion.div>
              <motion.div variants={fadeInRight}>
                <FeatureCard
                  icon={<BookOpen className="h-10 w-10 text-primary" />}
                  title="Content Summaries"
                  description="Get concise summaries of your content to review before taking the exam."
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section 
          className="py-20 px-4 md:px-6 bg-secondary/20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create and share exams in just a few simple steps
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8" variants={staggerContainer}>
              <motion.div variants={scaleIn}>
                <StepCard number={1} title="Upload Content" description="Upload your PDF files or paste text content" />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StepCard
                  number={2}
                  title="AI Processing"
                  description="Our AI analyzes your content and generates exam questions"
                />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StepCard
                  number={3}
                  title="Configure Settings"
                  description="Choose public or private access for your exam"
                />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StepCard number={4} title="Share & Take" description="Share with others or take the exam yourself" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* New CTA Section */}
        {/* <ThreeDMarqueeDemo></ThreeDMarqueeDemo> */}

        {/* CTA Section */}
        <motion.section 
          className="py-20 px-4 md:px-6 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="container mx-auto max-w-6xl z-10">
          {/* <ThreeDMarqueeDemo></ThreeDMarqueeDemo> */}
            <motion.div 
              className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                variants={fadeInUp}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
                variants={fadeInUp}
              >
                Join many students who are already using BrainSiftAI to create and take exams.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button asChild size="lg" variant="secondary" className="gap-2 z-20">
                  <Link href="/signup">
                    Create Your First Exam <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number | string
  label: string
}) {
  return (
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {icon}
      </motion.div>
      <motion.div 
        className="text-3xl font-bold text-foreground mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {value}
      </motion.div>
      <motion.div 
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div 
      className="bg-card text-card-foreground rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-xl font-semibold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.6,
          delay: number * 0.1,
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
        }}
      >
        {number}
      </motion.div>
      <motion.h3 
        className="text-xl font-semibold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: number * 0.1 + 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: number * 0.1 + 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

