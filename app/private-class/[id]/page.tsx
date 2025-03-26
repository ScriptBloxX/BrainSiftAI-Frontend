"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Mail, Plus, MoreHorizontal, UserPlus, BarChart, Copy, Check, UserMinus, UserCog } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivateClass({ params }: { params: Promise<{ id: string }> }) {
  const [inviteEmail, setInviteEmail] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showResultsDialog, setShowResultsDialog] = useState(false)
  const [showMemberDialog, setShowMemberDialog] = useState(false)
  const [currentMember, setCurrentMember] = useState<any>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [classId, setClassId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params
      setClassId(resolvedParams.id)
    }
    fetchParams()
  }, [params])


  // Mock class data
  const classData = {
    id: classId,
    name: "Biology 101",
    description: "Introduction to basic biological concepts and principles",
    createdBy: "John Smith",
    createdAt: "2025-3-15",
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
      { id: 1, title: "Cell Structure and Function", questions: 15, completions: 3, createdAt: "2025-1-20" },
      { id: 2, title: "Genetics Basics", questions: 20, completions: 2, createdAt: "2025-2-05" },
      { id: 3, title: "Evolution and Natural Selection", questions: 18, completions: 1, createdAt: "2025-3-10" },
    ],
  }

  // Mock exam results data
  const examResultsData = [
    {
      student: "Sarah Johnson",
      email: "sarah@example.com",
      score: 85,
      completedAt: "2025-3-25",
      timeSpent: "18 minutes",
    },
    {
      student: "Michael Brown",
      email: "michael@example.com",
      score: 92,
      completedAt: "2025-2-24",
      timeSpent: "15 minutes",
    },
    {
      student: "Emily Davis",
      email: "emily@example.com",
      score: 78,
      completedAt: "2025-1-26",
      timeSpent: "22 minutes",
    },
  ]

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an invitation
    alert(`Invitation sent to ${inviteEmail}`)
    setInviteEmail("")
    setShowInviteDialog(false)
  }

  const handleCopyLink = () => {
    const classLink = `https://brainsiftai.com/join-class/${classId}`
    navigator.clipboard.writeText(classLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleRemoveMember = (member: any) => {
    // In a real app, this would remove the member from the class
    alert(`${member.name} has been removed from the class`)
    setShowMemberDialog(false)
  }

  const handleChangeMemberRole = (member: any, role: string) => {
    // In a real app, this would change the member's role
  }

  const handleApplyRole = (member: any) => {
    // In a real app, this would send a message to the member
    alert(`Roel apply to ${member.name}`)
    setMessageText("")
    setShowMemberDialog(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-16">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{classData.name}</h1>
            <p className="text-muted-foreground mt-1">{classData.description}</p>
          </div>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" /> Invite Members
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Members</DialogTitle>
                  <DialogDescription>Send invitations to join your class</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea id="message" placeholder="Add a personal message to your invitation" rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="member">
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Invitation</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button asChild>
              <a href={`/create-exam?class=${classId}`}>
                <Plus className="mr-2 h-4 w-4" /> Add Exam
              </a>
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
                          <a href={`/create-exam?class=${classId}`}>
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
                          <CardDescription>Created on {exam.createdAt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm">
                            <span>{exam.questions} questions</span>
                            <span>{exam.completions} completions</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <BarChart className="mr-2 h-4 w-4" /> View Results
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>{exam.title} - Results</DialogTitle>
                                <DialogDescription>Student performance for this exam</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Student</TableHead>
                                      <TableHead>Score</TableHead>
                                      <TableHead>Completed</TableHead>
                                      <TableHead>Time Spent</TableHead>
                                      <TableHead>Actions</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {examResultsData.map((result, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="font-medium">
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                              <AvatarFallback>{result.student.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <div>{result.student}</div>
                                              <div className="text-xs text-muted-foreground">{result.email}</div>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge
                                            className={
                                              result.score >= 80
                                                ? "bg-green-500"
                                                : result.score >= 70
                                                  ? "bg-yellow-500"
                                                  : "bg-red-500"
                                            }
                                          >
                                            {result.score}%
                                          </Badge>
                                        </TableCell>
                                        <TableCell>{result.completedAt}</TableCell>
                                        <TableCell>{result.timeSpent}</TableCell>
                                        <TableCell>
                                          <Button variant="ghost" size="sm">
                                            View Details
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Export Results</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCurrentMember(member)
                                      setShowMemberDialog(true)
                                    }}
                                  >
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Manage Member
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleRemoveMember(member)}
                                  >
                                    <UserMinus className="mr-2 h-4 w-4" />
                                    Remove Member
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
                  <p className="text-sm text-muted-foreground">{classData.createdAt}</p>
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
                  <Input readOnly value={`https://brainsiftai.com/join-class/${classId}`} />
                  <Button variant="outline" onClick={handleCopyLink}>
                    {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Member Management Dialog */}
      {currentMember && (
        <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Member</DialogTitle>
              <DialogDescription>Update role or send a message to {currentMember.name}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentMember.avatar} alt={currentMember.name} />
                  <AvatarFallback>{currentMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{currentMember.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentMember.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="member-role">Member Role</Label>
                <Select
                  defaultValue={currentMember.role}
                  onValueChange={(value) => handleChangeMemberRole(currentMember, value)}
                >
                  <SelectTrigger id="member-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowMemberDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleApplyRole(currentMember)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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

