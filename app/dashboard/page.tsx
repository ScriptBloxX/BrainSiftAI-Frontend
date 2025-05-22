"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Plus, BookOpen, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import axios from "axios"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { UserPlus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type ExamType = {
    id: string
    title: string
    tags: string[]
    timer_minute: number
    visibility: boolean
    completions: number
    createdAt: string
    questionsCount: number
    creator: {
        id: number
        username: string
    }
}

export default function Dashboard() {
    const { isAuthenticated, isLoading, user, getToken } = useAuth()
    const router = useRouter()
    const [myExams, setMyExams] = useState<ExamType[]>([])
    const [loadingExams, setLoadingExams] = useState(true)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    useEffect(() => {
        const fetchExams = async () => {
            if (!isAuthenticated || !user) return

            try {
                setLoadingExams(true)
                const response = await axios.get("http://localhost:3001/api/exam/explore", {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                })

                // Filter exams to only show those created by the current user
                const userExams = response.data.filter((exam: ExamType) => exam.creator.id === user.id)
                setMyExams(userExams)
            } catch (error) {
                console.error("Failed to fetch exams:", error)
            } finally {
                setLoadingExams(false)
            }
        }

        if (isAuthenticated && user) {
            fetchExams()
        }
    }, [isAuthenticated, user, getToken])

    // If still loading or not authenticated, don't render the dashboard
    if (isLoading || !isAuthenticated) {
        return null
    }

    // Mock data for classes
    const myClasses = [
        { id: 1, name: "Biology 101", members: 12, exams: 3 },
        { id: 2, name: "Advanced Math Group", members: 8, exams: 5 },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your exams and classes</p>
                    </div>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="/create-exam">
                                <Plus className="mr-2 h-4 w-4" /> Create Exam
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/create-class">
                                <Users className="mr-2 h-4 w-4" /> Create Class
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Exams"
                        value={myExams.length.toString()}
                        description={`${myExams.filter((exam) => new Date(exam.createdAt).getMonth() === new Date().getMonth()).length} created this month`}
                        icon={<BookOpen className="h-5 w-5 text-muted-foreground" />}
                    />
                    <StatsCard
                        title="Private Classes"
                        value="2"
                        description="8 active members"
                        icon={<Users className="h-5 w-5 text-muted-foreground" />}
                    />
                    <StatsCard
                        title="Exam Completions"
                        value={myExams.reduce((sum, exam) => sum + exam.completions, 0).toString()}
                        description="from all your exams"
                        icon={<FileUp className="h-5 w-5 text-muted-foreground" />}
                    />
                </div>

                <Tabs defaultValue="exams" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="exams">My Exams</TabsTrigger>
                        <TabsTrigger value="classes">My Classes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exams">
                        {loadingExams ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Link href="/create-exam">
                                    <Card className="bg-primary/5 border-dashed border-primary/20 hover:border-primary/50 transition-colors cursor-pointer">
                                        <CardHeader className="flex flex-col items-center justify-center pt-8">
                                            <div className="p-3 rounded-full bg-primary/10 mb-4">
                                                <Plus className="h-8 w-8 text-primary" />
                                            </div>
                                            <CardTitle className="text-center">Create New Exam</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center pb-8">
                                            <p className="text-sm text-muted-foreground">Upload a PDF or enter text to generate an exam</p>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {myExams.length === 0 ? (
                                    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <p className="text-muted-foreground mb-4">You haven't created any exams yet</p>
                                            <Button asChild>
                                                <Link href="/create-exam">
                                                    <Plus className="mr-2 h-4 w-4" /> Create Your First Exam
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    myExams.map((exam) => (
                                        <ExamCard
                                            key={exam.id}
                                            title={exam.title}
                                            questions={exam.questionsCount}
                                            visibility={exam.visibility ? "public" : "private"}
                                            createdAt={exam.createdAt}
                                            id={exam.id}
                                            tags={exam.tags}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="classes">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Link href="/create-class">
                                <Card className="bg-primary/5 border-dashed border-primary/20 hover:border-primary/50 transition-colors cursor-pointer">
                                    <CardHeader className="flex flex-col items-center justify-center pt-8">
                                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                                            <Users className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-center">Create New Class</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center pb-8">
                                        <p className="text-sm text-muted-foreground">Create a private class and invite members</p>
                                    </CardContent>
                                </Card>
                            </Link>
                            {myClasses.map((cls) => (
                                <ClassCard key={cls.id} name={cls.name} members={cls.members} exams={cls.exams} id={cls.id} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </div>
    )
}

function StatsCard({
    title,
    value,
    description,
    icon,
}: {
    title: string
    value: string
    description: string
    icon: React.ReactNode
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </CardContent>
        </Card>
    )
}

function ExamCard({
    title,
    questions,
    visibility,
    createdAt,
    id,
    tags = [],
}: {
    title: string
    questions: number
    visibility: string
    createdAt: string
    id: string
    tags?: string[]
}) {
    const router = useRouter()
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [examTitle, setExamTitle] = useState(title)
    const [examVisibility, setExamVisibility] = useState(visibility)

    const handleView = () => {
        router.push(`/exam/${id}`)
    }

    const handleEdit = () => {
        setShowEditDialog(true)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const handleSaveChanges = () => {
        // In a real app, you would make an API call to update the exam
        setShowEditDialog(false)
        // Show a success message
        alert("Exam updated successfully")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription>Created on {formatDate(createdAt)}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm mb-2">
                    <span>{questions} questions</span>
                    <span className={`capitalize ${visibility === "public" ? "text-green-500" : "text-amber-500"}`}>
                        {visibility}
                    </span>
                </div>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                    Edit
                </Button>
                <Button size="sm" onClick={handleView}>
                    Take Exam
                </Button>
            </CardFooter>

            {/* Edit Exam Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Exam</DialogTitle>
                        <DialogDescription>Make changes to your exam settings</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Exam Title</Label>
                            <Input id="edit-title" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-visibility">Visibility</Label>
                            <Select value={examVisibility} onValueChange={setExamVisibility}>
                                <SelectTrigger id="edit-visibility">
                                    <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

function ClassCard({
    name,
    members,
    exams,
    id = Math.floor(Math.random() * 1000),
}: {
    name: string
    members: number
    exams: number
    id?: number
}) {
    const router = useRouter()
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [className, setClassName] = useState(name)

    const handleView = () => {
        router.push(`/private-class/${id}`)
    }

    const handleManage = () => {
        setShowEditDialog(true)
    }

    const handleSaveChanges = () => {
        // In a real app, you would make an API call to update the class
        setShowEditDialog(false)
        // Show a success message
        alert("Class updated successfully")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="line-clamp-1">{name}</CardTitle>
                <CardDescription>{members} members</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm">
                    <span>{exams} exams in this class</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={handleManage}>
                    Manage
                </Button>
                <Button size="sm" onClick={handleView}>
                    View
                </Button>
            </CardFooter>

            {/* Edit Class Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Manage Class</DialogTitle>
                        <DialogDescription>Update class settings or invite members</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="settings">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="members">Members</TabsTrigger>
                        </TabsList>
                        <TabsContent value="settings" className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-class-name">Class Name</Label>
                                <Input id="edit-class-name" value={className} onChange={(e) => setClassName(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="private-class">Private Class</Label>
                                    <p className="text-sm text-muted-foreground">Only invited users can access this class</p>
                                </div>
                                <Switch id="private-class" defaultChecked />
                            </div>
                        </TabsContent>
                        <TabsContent value="members" className="py-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="invite-email">Invite Member</Label>
                                    <div className="flex gap-2">
                                        <Input id="invite-email" placeholder="Enter email address" type="email" />
                                        <Button>
                                            <UserPlus className="mr-2 h-4 w-4" /> Invite
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Current Members</Label>
                                    <div className="rounded-md border">
                                        <div className="flex items-center justify-between p-3 border-b">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>JS</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">John Smith</p>
                                                    <p className="text-xs text-muted-foreground">john@example.com</p>
                                                </div>
                                            </div>
                                            <Badge>Owner</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>SJ</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">Sarah Johnson</p>
                                                    <p className="text-xs text-muted-foreground">sarah@example.com</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

