"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Mail, Plus, MoreHorizontal } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivateClass({ params }: { params: { id: string } }) {
  const [inviteEmail, setInviteEmail] = useState("")

  // Mock class data
  const classData = {
    id: params.id,
    name: "Biology 101",
    description: "Introduction to basic biological concepts and principles",
    createdBy: "John Smith",
    createdAt: "2023-10-15",
    members: [
      {
        id: 1,
        name: "John Smith",
        email: "john@example.com",
        role: "owner",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael@example.com",
        role: "member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    exams: [
      { id: 1, title: "Cell Structure and Function", questions: 15, completions: 3, createdAt: "2023-10-20" },
      { id: 2, title: "Genetics Basics", questions: 20, completions: 2, createdAt: "2023-11-05" },
      { id: 3, title: "Evolution and Natural Selection", questions: 18, completions: 1, createdAt: "2023-12-10" },
    ],
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an invitation
    alert(`Invitation sent to ${inviteEmail}`)
    setInviteEmail("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{classData.name}</h1>
            <p className="text-muted-foreground mt-1">{classData.description}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <a href={`/create-exam?class=${params.id}`}>
                <Plus className="mr-2 h-4 w-4" /> Add Exam
              </a>
            </Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" /> Invite Members
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="exams" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="exams">Exams</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              <TabsContent value="exams">
                <div className="space-y-6">
                  {classData.exams.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Exams Yet</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-4">
                          This class doesn't have any exams yet. Create your first exam to get started.
                        </p>
                        <Button asChild>
                          <a href={`/create-exam?class=${params.id}`}>
                            <Plus className="mr-2 h-4 w-4" /> Create Exam
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    classData.exams.map((exam) => (
                      <Card key={exam.id}>
                        <CardHeader>
                          <CardTitle>{exam.title}</CardTitle>
                          <CardDescription>Created on {formatDate(exam.createdAt)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm">
                            <span>{exam.questions} questions</span>
                            <span>{exam.completions} completions</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                          <Button size="sm" asChild>
                            <a href={`/exam/${exam.id}`}>Take Exam</a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Members</CardTitle>
                    <CardDescription>{classData.members.length} members in this class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {classData.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={member.role === "owner" ? "default" : "secondary"}>{member.role}</Badge>
                            {member.role !== "owner" && (
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Created by</p>
                  <p className="text-sm text-muted-foreground">{classData.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Created on</p>
                  <p className="text-sm text-muted-foreground">{formatDate(classData.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Members</p>
                  <p className="text-sm text-muted-foreground">{classData.members.length} members</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Exams</p>
                  <p className="text-sm text-muted-foreground">{classData.exams.length} exams</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invite Members</CardTitle>
                <CardDescription>Invite new members to join this class</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                      />
                      <Button type="submit">Invite</Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Link</CardTitle>
                <CardDescription>Share this link to invite people to your class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input readOnly value={`https://brainsiftai.com/join-class/${params.id}`} />
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://brainsiftai.com/join-class/${params.id}`)
                      alert("Link copied to clipboard!")
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

