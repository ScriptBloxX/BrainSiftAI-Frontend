import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Plus, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Dashboard() {
    // Mock data for exams
    const myExams = [
        { id: 1, title: "Introduction to Biology", questions: 15, visibility: "public", createdAt: "2023-10-15" },
        { id: 2, title: "Advanced Mathematics", questions: 20, visibility: "private", createdAt: "2023-11-02" },
        { id: 3, title: "World History Overview", questions: 25, visibility: "public", createdAt: "2023-12-10" },
    ]

    // Mock data for classes
    const myClasses = [
        { id: 1, name: "Biology 101", members: 12, exams: 3 },
        { id: 2, name: "Advanced Math Group", members: 8, exams: 5 },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8">
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
                        value="12"
                        description="3 created this month"
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
                        value="156"
                        description="24 in the last week"
                        icon={<FileUp className="h-5 w-5 text-muted-foreground" />}
                    />
                </div>

                <Tabs defaultValue="exams" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="exams">My Exams</TabsTrigger>
                        <TabsTrigger value="classes">My Classes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exams">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                            {myExams.map((exam) => (
                                <ExamCard
                                    key={exam.id}
                                    title={exam.title}
                                    questions={exam.questions}
                                    visibility={exam.visibility}
                                    createdAt={exam.createdAt}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="classes">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                            {myClasses.map((cls) => (
                                <ClassCard key={cls.id} name={cls.name} members={cls.members} exams={cls.exams} />
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
}: {
    title: string
    questions: number
    visibility: string
    createdAt: string
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription>Created on {createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm">
                    <span>{questions} questions</span>
                    <span className={`capitalize ${visibility === "public" ? "text-green-500" : "text-amber-500"}`}>
                        {visibility}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                    Edit
                </Button>
                <Button size="sm">View</Button>
            </CardFooter>
        </Card>
    )
}

function ClassCard({
    name,
    members,
    exams,
}: {
    name: string
    members: number
    exams: number
}) {
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
                <Button variant="outline" size="sm">
                    Manage
                </Button>
                <Button size="sm">Invite</Button>
            </CardFooter>
        </Card>
    )
}

