"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Plus, BookOpen, Users, Loader2, Clock, Trophy, Calendar } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import axiosInstance from "@/lib/axios"
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
import toast, { Toaster } from "react-hot-toast"

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

type ExamHistoryType = {
    id: string
    examId: string
    examTitle: string
    score: number
    totalQuestions: number
    percentage: number
    completedAt: string
}

type ExamHistoryGroup = {
    examId: string
    examTitle: string
    attempts: ExamHistoryType[]
    totalAttempts: number
    bestScore: number
    averageScore: number
}

export default function Dashboard() {
    const { isAuthenticated, isLoading, user, getToken } = useAuth()
    const router = useRouter()
    const [myExams, setMyExams] = useState<ExamType[]>([])
    const [examHistory, setExamHistory] = useState<ExamHistoryGroup[]>([])
    const [loadingExams, setLoadingExams] = useState(true)
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [selectedExamHistory, setSelectedExamHistory] = useState<ExamHistoryGroup | null>(null)
    const [showHistoryDialog, setShowHistoryDialog] = useState(false)

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
                const response = await axiosInstance.get(`/api/exam/dashboard`)
                setMyExams(response.data)
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

    useEffect(() => {
        const fetchExamHistory = async () => {
            if (!isAuthenticated || !user) return

            try {
                setLoadingHistory(true)
                const response = await axiosInstance.get(`/api/exam/total_attempts`)
                const groupedHistory: ExamHistoryGroup[] = response.data.map((group: ExamHistoryGroup) => ({
                    ...group,
                    attempts: group.attempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                }))

                setExamHistory(groupedHistory)
            } catch (error) {
                console.error("Failed to fetch exam history:", error)
            } finally {
                setLoadingHistory(false)
            }
        }

        if (isAuthenticated && user) {
            fetchExamHistory()
        }
    }, [isAuthenticated, user])

    // If still loading or not authenticated, don't render the dashboard
    if (isLoading || !isAuthenticated) {
        return null
    }

    const refreshExams = async () => {
        if (!isAuthenticated || !user) return

        try {
            const response = await axiosInstance.get(`/api/exam/dashboard`)
            setMyExams(response.data)
        } catch (error) {
            console.error("Failed to fetch exams:", error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your exams</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Exams Created"
                        value={myExams.length.toString()}
                        description={`${myExams.filter((exam) => new Date(exam.createdAt).getMonth() === new Date().getMonth()).length} created this month`}
                        icon={<BookOpen className="h-5 w-5 text-muted-foreground" />}
                    />
                    <StatsCard
                        title="Total Completions"
                        value={myExams.reduce((sum, exam) => sum + exam.completions, 0).toString()}
                        description="Completions across all your exams"
                        icon={<FileUp className="h-5 w-5 text-muted-foreground" />}
                    />
                    <StatsCard
                        title="Total Attempts"
                        value={examHistory.reduce((sum, group) => sum + group.totalAttempts, 0).toString()}
                        description="All exams you have attempted"
                        icon={<Users className="h-5 w-5 text-muted-foreground" />}
                    />
                </div>

                <Tabs defaultValue="exams" className="w-full">                    <TabsList className="mb-6">
                    <TabsTrigger value="exams">My Exams</TabsTrigger>
                    <TabsTrigger value="history">My Attempts</TabsTrigger>
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
                                            onUpdate={refreshExams}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="history">
                        {loadingHistory ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : examHistory.length === 0 ? (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground mb-4">No exam history found</p>
                                    <p className="text-sm text-muted-foreground">Take some exams to see your history here</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {examHistory.map((examGroup) => (
                                    <ExamHistoryCard
                                        key={examGroup.examId}
                                        examGroup={examGroup}
                                        onClick={() => {
                                            setSelectedExamHistory(examGroup)
                                            setShowHistoryDialog(true)
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Exam History Details Dialog */}
                <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{selectedExamHistory?.examTitle}</DialogTitle>
                            <DialogDescription>
                                Exam attempt history ({selectedExamHistory?.totalAttempts} attempts)
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            {selectedExamHistory?.attempts.map((attempt, index) => (
                                <ExamAttemptCard key={attempt.id} attempt={attempt} attemptNumber={index + 1} />
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </main>

            <Footer />
            <Toaster />
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
    onUpdate,
}: {
    title: string
    questions: number
    visibility: string
    createdAt: string
    id: string
    tags?: string[]
    onUpdate?: () => void
}) {
    const router = useRouter()
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [examTitle, setExamTitle] = useState(title)
    const [examVisibility, setExamVisibility] = useState(visibility)
    const [examTags, setExamTags] = useState<string[]>(tags)
    const [newTag, setNewTag] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [currentVisibility, setCurrentVisibility] = useState(visibility)

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

    const handleSaveChanges = async () => {
        try {
            setIsSaving(true)

            const payload = {
                id: id,
                title: examTitle,
                visibility: examVisibility === "public",
                tags: examTags
            }

            await axiosInstance.patch(`/api/exam`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            setCurrentVisibility(examVisibility)
            setShowEditDialog(false)

            // Update parent component's state
            if (onUpdate) {
                onUpdate()
            }

            toast.success("Exam updated successfully!", {
                position: 'bottom-right',
                style: {
                    background: '#020817',
                    color: '#fff',
                },
            })
        } catch (error) {
            console.error("Failed to update exam:", error)
            toast.error("Failed to update exam. Please try again.", {
                position: 'bottom-right',
                style: {
                    background: '#020817',
                    color: '#fff',
                },
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleAddTag = () => {
        if (newTag.trim() === "") return
        if (!examTags.includes(newTag.trim())) {
            setExamTags([...examTags, newTag.trim()])
            setNewTag("")
        }
    }

    const handleDeleteTag = (tagToDelete: string) => {
        setExamTags(examTags.filter(tag => tag !== tagToDelete))
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
                    <span className={`capitalize ${currentVisibility === "public" ? "text-green-500" : "text-amber-500"}`}>
                        {currentVisibility}
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
                        <div className="space-y-2">
                            <Label htmlFor="edit-tags">Tags</Label>
                            <div className="flex flex-wrap gap-2">
                                {examTags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteTag(tag)}
                                            className="h-4 w-4 p-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </Badge>
                                ))}
                                <Input
                                    id="edit-tags"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag and press Enter"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTag();
                                        }
                                    }}
                                    disabled={isSaving}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={isSaving}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

function ExamHistoryCard({
    examGroup,
    onClick,
}: {
    examGroup: ExamHistoryGroup
    onClick: () => void
}) {
    const router = useRouter()

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const handleRetake = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent card click event
        router.push(`/exam/${examGroup.examId}`)
    }

    return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
            <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{examGroup.examTitle}</CardTitle>

                <CardDescription>
                    Last attempt: {formatDate(examGroup.attempts[0]?.completedAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Attempts</span>
                        <Badge variant="secondary">{examGroup.totalAttempts}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Best Score</span>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-xs font-medium ${examGroup.bestScore >= 80
                                        ? "text-green-500"
                                        : examGroup.bestScore >= 60
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                    }`}
                            >
                                {examGroup.bestScore}%
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average Score</span>
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${examGroup.averageScore >= 80
                                    ? "text-green-500"
                                    : examGroup.averageScore >= 60
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                }`}
                            >
                                {examGroup.averageScore}%
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-3">
                <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleRetake}
                >
                    Retake
                </Button>
            </CardFooter>
        </Card>
    )
}

function ExamAttemptCard({
    attempt,
    attemptNumber,
}: {
    attempt: ExamHistoryType
    attemptNumber: number
}) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getScoreBackground = (percentage: number) => {
        if (percentage >= 80) return "bg-green-500"
        if (percentage >= 60) return "bg-yellow-500"
        return "bg-red-500"
    }

    const getAttemptId = (id: string) => {
        return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`
    }

    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">#{getAttemptId(attempt.id)}</Badge>
                            <span className="text-sm text-muted-foreground">
                                {formatDate(attempt.completedAt)}
                            </span>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            <span>{attempt.score}/{attempt.totalQuestions}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge className={`${getScoreBackground(attempt.percentage)}`}>
                            <span className={`text-lg font-bold`}>
                                {attempt.percentage}%
                            </span>
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

