"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Copy, Share2, Edit, Check, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import toast, { Toaster } from "react-hot-toast"
import LoadingScreen from "@/components/loading-screen"
import { useAuth } from "@/components/auth-context"

// Define types for the structured summary
type SummaryItem = {
    text?: string;
    type: string;
    items?: string[];
    language?: string;
}

type QuestionType = {
    questionText: string;
    options: string[];
    correctAnswer: number;
}

type ExamData = {
    success: boolean;
    id: number;
    title: string;
    isPrivate: boolean;
    timer: number;
    tags: string[] | null;
    input: number;
    summary: SummaryItem[];
    questions: QuestionType[];
}

type Props = {
    params: { id: string }
}

export default function ExamPreview({ params }: Props) {
    const unwrappedParams = React.use(params as any) as { id: string };
    const { id } = unwrappedParams;

    const [examId, setExamId] = useState<string | null>(null)
    const [isPrivate, setIsPrivate] = useState(false)
    const [copied, setCopied] = useState(false)

    const [title, setTitle] = useState<string>("")
    const [examData, setExamData] = useState<ExamData | null>(null)
    const [timer, setTimer] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)

    const { getToken } = useAuth()
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://brain-sift-ai-backend.onrender.com";


    useEffect(() => {
        // Fetch the exam data using the ID from the URL
        const fetchData = async () => {
            try {
                setExamId(id);

                const response = await fetch(`${API_BASE_URL}/api/exam/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch exam data: ${response.status}`);
                }

                const data = await response.json();
                setExamData(data);
                setIsPrivate(data.isPrivate);
                setTitle(data.title);
                setTimer(data.timer_minute);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching exam data:", error);
                toast.error("Failed to load exam data", {
                    position: 'bottom-right',
                    style: {
                        background: '#020817',
                        color: '#fff',
                    },
                });
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    if (loading) {
        return <LoadingScreen />
    }

    const copyShareLink = () => {
        const shareLink = `${window.location.origin}/exam/${examId}`
        navigator.clipboard.writeText(shareLink)
        setCopied(true)
        toast.success("Share link copied to clipboard!", {
            position: 'bottom-right',
            style: {
                background: '#020817',
                color: '#fff',
            },
        })
        setTimeout(() => setCopied(false), 2000)
    }

    // Render summary content based on its type
    const renderSummaryContent = () => {
        if (!examData?.summary) return null;

        return (
            <div className="space-y-4">
                {examData.summary.map((item, index) => {
                    if (item.type === "heading") {
                        return <h3 key={index} className="text-xl font-semibold mt-6">{item.text}</h3>;
                    } else if (item.type === "paragraph") {
                        return <p key={index}>{item.text}</p>;
                    } else if (item.type === "list" && item.items) {
                        return (
                            <ul key={index} className="list-disc pl-6 space-y-1">
                                {item.items.map((listItem, i) => (
                                    <li key={i}>{listItem}</li>
                                ))}
                            </ul>
                        );
                    } else if (item.type === "code") {
                        return (
                            <pre key={index} className="bg-muted p-4 rounded-md overflow-x-auto my-4">
                                <code className={item.language ? `language-${item.language}` : ''}>
                                    {item.text}
                                </code>
                            </pre>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#020817',
                        color: '#fff',
                    },
                }}
            />

            <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground mt-1">Preview and configure your exam</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={copyShareLink}>
                            {copied ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" /> Copied
                                </>
                            ) : (
                                <>
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </>
                            )}
                        </Button>
                        <Button asChild>
                            <a href={`/exam/${examId}`}>Take Exam</a>
                        </Button>
                    </div>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Exam Settings</CardTitle>
                        <CardDescription>Configure how your exam will be shared</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="exam-title">Exam Title</Label>
                            <Input id="exam-title" disabled defaultValue={title} className="mt-2" />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                Time limit: {timer ? timer + " minutes" : "Auto"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="private-exam">Private Exam</Label>
                                <p className="text-sm text-muted-foreground">Only invited users can access this exam</p>
                            </div>
                            <Switch id="private-exam" checked={isPrivate} onCheckedChange={setIsPrivate} />
                        </div>

                        {isPrivate && (
                            <div>
                                <Label htmlFor="invite-email">Invite Users</Label>
                                <div className="flex gap-2 mt-2">
                                    <Input id="invite-email" placeholder="Enter email address" type="email" />
                                    <Button onClick={() => toast.error(`This feature is under development and will be available in a future update.`, {
                                        position: 'bottom-right',
                                        duration: 4000,
                                        style: {
                                            background: '#020817',
                                            color: '#fff',
                                        },
                                    })}>Invite</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="preview">Exam Preview</TabsTrigger>
                        <TabsTrigger value="summary">Content Summary</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview">
                        <div className="space-y-8">
                            {examData?.questions?.map((q, index) => (
                                <Card key={index}>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between">
                                            <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                                            <Button variant="ghost" size="icon" onClick={() => toast.error(`This feature is under development and will be available in a future update.`, {
                                                position: 'bottom-right',
                                                duration: 4000,
                                                style: {
                                                    background: '#020817',
                                                    color: '#fff',
                                                },
                                            })}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4">{q.questionText}</p>
                                        <RadioGroup defaultValue={`option-${q.correctAnswer}`}>
                                            {q.options.map((option, i) => (
                                                <div key={i} className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value={`option-${i}`}
                                                        id={`q${index}-option-${i}`}
                                                        checked={i === q.correctAnswer}
                                                    />
                                                    <Label htmlFor={`q${index}-option-${i}`}>{option}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="summary">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Summary</CardTitle>
                                <CardDescription>AI-generated summary of your content</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renderSummaryContent()}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        // Convert the structured summary to text for copying
                                        const summaryText = examData?.summary
                                            .map(item => {
                                                if (item.type === "heading") return `## ${item.text}\n\n`;
                                                if (item.type === "paragraph") return `${item.text}\n\n`;
                                                if (item.type === "list" && item.items) {
                                                    return item.items.map(li => `• ${li}`).join('\n') + '\n\n';
                                                }
                                                if (item.type === "code") {
                                                    return `\`\`\`${item.language || ''}\n${item.text}\n\`\`\`\n\n`;
                                                }
                                                return '';
                                            })
                                            .join('') || "";

                                        navigator.clipboard.writeText(summaryText);
                                        toast.success("Summary copied to clipboard!", {
                                            position: 'bottom-right',
                                            style: {
                                                background: '#020817',
                                                color: '#fff',
                                            },
                                        });
                                    }}
                                >
                                    <Copy className="mr-2 h-4 w-4" /> Copy Summary
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </div>
    )
}
