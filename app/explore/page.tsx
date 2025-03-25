import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Clock, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Explore() {
    // Mock data for public exams
    const publicExams = [
        {
            id: 1,
            title: "Introduction to Biology",
            creator: "John Smith",
            questions: 15,
            completions: 156,
            createdAt: "2023-10-15",
            tags: ["Biology", "Science", "Beginner"],
        },
        {
            id: 2,
            title: "Advanced Mathematics",
            creator: "Jane Doe",
            questions: 20,
            completions: 89,
            createdAt: "2023-11-02",
            tags: ["Mathematics", "Advanced"],
        },
        {
            id: 3,
            title: "World History Overview",
            creator: "Robert Johnson",
            questions: 25,
            completions: 210,
            createdAt: "2023-12-10",
            tags: ["History", "Global"],
        },
        {
            id: 4,
            title: "Introduction to Psychology",
            creator: "Sarah Williams",
            questions: 18,
            completions: 124,
            createdAt: "2024-01-05",
            tags: ["Psychology", "Social Science"],
        },
        {
            id: 5,
            title: "Basic Chemistry Concepts",
            creator: "Michael Brown",
            questions: 22,
            completions: 98,
            createdAt: "2024-01-20",
            tags: ["Chemistry", "Science"],
        },
        {
            id: 6,
            title: "English Literature Classics",
            creator: "Emily Davis",
            questions: 30,
            completions: 76,
            createdAt: "2024-02-08",
            tags: ["Literature", "English", "Classics"],
        },
    ]

    // Popular tags
    const popularTags = [
        "Science",
        "Mathematics",
        "History",
        "Literature",
        "Psychology",
        "Biology",
        "Chemistry",
        "Physics",
        "Computer Science",
        "Art",
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Explore Exams</h1>
                        <p className="text-muted-foreground mt-1">Discover public exams created by the community</p>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search exams..." className="pl-10 w-full md:w-[300px]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Popular Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="cursor-pointer">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Filters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Questions</h3>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="cursor-pointer">
                                            1-10
                                        </Badge>
                                        <Badge variant="outline" className="cursor-pointer">
                                            11-20
                                        </Badge>
                                        <Badge variant="outline" className="cursor-pointer">
                                            21+
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Date Added</h3>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="cursor-pointer">
                                            Today
                                        </Badge>
                                        <Badge variant="outline" className="cursor-pointer">
                                            This Week
                                        </Badge>
                                        <Badge variant="outline" className="cursor-pointer">
                                            This Month
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-3">
                        <Tabs defaultValue="all" className="w-full mb-6">
                            <TabsList>
                                <TabsTrigger value="all">All Exams</TabsTrigger>
                                <TabsTrigger value="popular">Popular</TabsTrigger>
                                <TabsTrigger value="recent">Recently Added</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {publicExams.map((exam) => (
                                <ExamCard
                                    key={exam.id}
                                    id={exam.id}
                                    title={exam.title}
                                    creator={exam.creator}
                                    questions={exam.questions}
                                    completions={exam.completions}
                                    createdAt={exam.createdAt}
                                    tags={exam.tags}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function ExamCard({
    id,
    title,
    creator,
    questions,
    completions,
    createdAt,
    tags,
}: {
    id: number
    title: string
    creator: string
    questions: number
    completions: number
    createdAt: string
    tags: string[]
}) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {creator}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
                <div className="flex flex-wrap gap-1 mb-3">
                    {tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> {questions} questions
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDate(createdAt)}
                    </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">{completions} completions</div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/exam/${id}`}>Take Exam</Link>
                </Button>
            </CardFooter>
        </Card>
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

