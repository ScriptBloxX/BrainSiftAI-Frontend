"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Clock, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import axios from "axios";
import LoadingScreen from "@/components/loading-screen"

export default function Explore() {
    // State for search and filters
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<string | null>(null)
    const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("all")
    const [filteredExams, setFilteredExams] = useState<{
        id: number;
        title: string;
        creator: string;
        questions: number;
        completions: number;
        createdAt: string;
        tags: string[];
    }[]>([]);
    const [publicExams, setPublicExams] = useState<{
        id: number;
        title: string;
        creator: string;
        questions: number;
        completions: number;
        createdAt: string;
        tags: string[];
    }[]>([]);
    const [loadingScreen, setLoadingScreen] = useState(true);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://brain-sift-ai-backend.onrender.com";

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/exam/explore`);
                console.log(response.data);
                const formattedExams = response.data.map((exam: any) => ({
                    id: exam.id,
                    title: exam.title,
                    creator: exam.creator.username || "Unknown",
                    questions: exam.questionsCount || 0,
                    completions: exam.completions || 0,
                    createdAt: exam.createdAt || new Date().toISOString(),
                    tags: exam.tags || [],
                }));
                setFilteredExams(formattedExams);
                setPublicExams(formattedExams);
                setLoadingScreen(false);
            } catch (error) {
                console.error("Error fetching exams:", error);
                setLoadingScreen(false);
            }
        };

        fetchExams();
    }, []);

    // Popular tags
    const popularTags = [
        "Web Technology",
        "Computer Networks",
        "Basic Security",
        "Basic Programming",
        "Software Development Tools",
        "English",
        "Computer Networks Lab",
    ]

    // Filter exams based on selected filters
    useEffect(() => {
        let filtered = [...publicExams]

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (exam) =>
                    exam.title.toLowerCase().includes(query) ||
                    exam.creator.toLowerCase().includes(query) ||
                    exam.tags.some((tag) => tag.toLowerCase().includes(query)),
            )
        }

        // Filter by selected tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter((exam) => exam.tags.some((tag) => selectedTags.includes(tag)))
        }

        // Filter by question count
        if (selectedQuestionFilter) {
            switch (selectedQuestionFilter) {
                case "1-10":
                    filtered = filtered.filter((exam) => exam.questions <= 10)
                    break
                case "11-20":
                    filtered = filtered.filter((exam) => exam.questions > 10 && exam.questions <= 20)
                    break
                case "21+":
                    filtered = filtered.filter((exam) => exam.questions > 20)
                    break
            }
        }

        // Filter by date
        if (selectedDateFilter) {
            const now = new Date()
            const today = new Date(now.setHours(0, 0, 0, 0))
            const weekAgo = new Date(today)
            weekAgo.setDate(today.getDate() - 7)
            const monthAgo = new Date(today)
            monthAgo.setMonth(today.getMonth() - 1)

            switch (selectedDateFilter) {
                case "Today":
                    filtered = filtered.filter((exam) => {
                        const examDate = new Date(exam.createdAt)
                        return examDate >= today
                    })
                    break
                case "This Week":
                    filtered = filtered.filter((exam) => {
                        const examDate = new Date(exam.createdAt)
                        return examDate >= weekAgo
                    })
                    break
                case "This Month":
                    filtered = filtered.filter((exam) => {
                        const examDate = new Date(exam.createdAt)
                        return examDate >= monthAgo
                    })
                    break
            }
        }

        // Filter by tab
        if (activeTab === "popular") {
            filtered.sort((a, b) => b.completions - a.completions)
        } else if (activeTab === "recent") {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }

        setFilteredExams(filtered)
    }, [searchQuery, selectedTags, selectedQuestionFilter, selectedDateFilter, activeTab])

    // Toggle tag selection
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    // Toggle question filter
    const toggleQuestionFilter = (filter: string) => {
        if (selectedQuestionFilter === filter) {
            setSelectedQuestionFilter(null)
        } else {
            setSelectedQuestionFilter(filter)
        }
    }

    // Toggle date filter
    const toggleDateFilter = (filter: string) => {
        if (selectedDateFilter === filter) {
            setSelectedDateFilter(null)
        } else {
            setSelectedDateFilter(filter)
        }
    }

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    // Clear all filters
    const clearFilters = () => {
        setSelectedTags([])
        setSelectedQuestionFilter(null)
        setSelectedDateFilter(null)
        setSearchQuery("")
    }

    if (loadingScreen) return <LoadingScreen />

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
                        <Input
                            placeholder="Search exams..."
                            className="pl-10 w-full md:w-[300px]"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-1 space-y-6">
                        {(selectedTags.length > 0 || selectedQuestionFilter || selectedDateFilter) && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                Clear All
                            </Button>
                        )}
                        <Card>
                            <CardHeader>
                                <CardTitle>Popular Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant={selectedTags.includes(tag) ? "default" : "secondary"}
                                            className="cursor-pointer"
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Filters</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Questions</h3>
                                    <div className="flex gap-2">
                                        <Badge
                                            variant={selectedQuestionFilter === "1-10" ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleQuestionFilter("1-10")}
                                        >
                                            1-10
                                        </Badge>
                                        <Badge
                                            variant={selectedQuestionFilter === "11-20" ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleQuestionFilter("11-20")}
                                        >
                                            11-20
                                        </Badge>
                                        <Badge
                                            variant={selectedQuestionFilter === "21+" ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleQuestionFilter("21+")}
                                        >
                                            21+
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Date Added</h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge
                                            variant={selectedDateFilter === "Today" ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleDateFilter("Today")}
                                        >
                                            Today
                                        </Badge>
                                        <Badge
                                            variant={selectedDateFilter === "This Week" ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleDateFilter("This Week")}
                                        >
                                            This Week
                                        </Badge>
                                        <Badge
                                            variant={selectedDateFilter === "This Month" ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleDateFilter("This Month")}
                                        >
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
                                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                                    All Exams
                                </TabsTrigger>
                                <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
                                    Popular
                                </TabsTrigger>
                                <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
                                    Recently Added
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {filteredExams.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium mb-2">No exams found</h3>
                                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredExams.map((exam) => (
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
                        )}
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

