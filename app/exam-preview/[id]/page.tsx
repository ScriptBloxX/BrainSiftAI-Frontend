"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Copy, Share2, Edit, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import toast, { Toaster } from "react-hot-toast"

type Props = {
    params: Promise<{ id: string }>
}

export default function ExamPreview({ params }: Props) {
    const [examId, setExamId] = useState<string | null>(null)
    const [isPrivate, setIsPrivate] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        params.then(({ id }) => setExamId(id))
    }, [params])

    if (!examId) {
        return <div>Loading...</div>
    }

    // Mock exam data
    const examData = {
        title: "Introduction to Biology",
        summary:
            "This exam covers the basic concepts of biology, including cell structure, genetics, and evolution. The content focuses on fundamental principles that form the foundation of biological sciences.",
        questions: [
            {
                id: 1,
                question: "What is the basic unit of life?",
                options: ["Atom", "Cell", "Molecule", "Tissue"],
                correctAnswer: 1,
            },
            {
                id: 2,
                question: "Which of the following is NOT a function of the cell membrane?",
                options: ["Protection", "Energy production", "Transport of materials", "Cell recognition"],
                correctAnswer: 1,
            },
            {
                id: 3,
                question: "DNA replication occurs during which phase of the cell cycle?",
                options: ["G1 phase", "S phase", "G2 phase", "M phase"],
                correctAnswer: 1,
            },
            {
                id: 4,
                question: "What is the process by which cells break down glucose to produce energy?",
                options: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"],
                correctAnswer: 1,
            },
            {
                id: 5,
                question: "Which organelle is responsible for protein synthesis in the cell?",
                options: ["Mitochondria", "Golgi apparatus", "Ribosome", "Lysosome"],
                correctAnswer: 2,
            },
        ],
    }

    const copyShareLink = () => {
        const shareLink = `https://brainsiftai.com/exam/${examId}`
        navigator.clipboard.writeText(shareLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Toaster
                position="bottom-right"
            />

            <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{examData.title}</h1>
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
                            <Input disabled id="exam-title" defaultValue={examData.title} className="mt-2" />
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
                                        iconTheme: {
                                            primary: '#ff4b4b',
                                            secondary: '#fff',
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
                            {examData.questions.map((q, index) => (
                                <Card key={q.id}>
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
                                                iconTheme: {
                                                    primary: '#ff4b4b',
                                                    secondary: '#fff',
                                                },
                                            })}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4">{q.question}</p>
                                        <RadioGroup defaultValue="option-0">
                                            {q.options.map((option, i) => (
                                                <div key={i} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={`option-${i}`} id={`q${q.id}-option-${i}`} />
                                                    <Label htmlFor={`q${q.id}-option-${i}`}>{option}</Label>
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
                                <p className="whitespace-pre-line">{examData.summary}</p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => navigator.clipboard.writeText(examData.summary)}
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
