"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FileUp, Upload, Loader2, X, Tag as TagIcon } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'
import { Badge } from "@/components/ui/badge"

export default function CreateExam() {
    const [isUploading, setIsUploading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const [textContent, setTextContent] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [examTitle, setExamTitle] = useState("")
    const [examTimer, setExamTimer] = useState<number | null>(null)
    const [errors, setErrors] = useState<{ title?: string; timer?: string; questionCount?: string }>({})
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")
    const [questionCount, setQuestionCount] = useState<number | null>(null)

    const { isAuthenticated, isLoading, getToken } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    // If still loading or not authenticated, don't render the page
    if (isLoading || !isAuthenticated) {
        return null
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsUploading(true)
            setFileName(file.name)

            // Simulate upload delay
            setTimeout(() => {
                setIsUploading(false)
            }, 2000)
        }
    }

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const validateForm = () => {
        const newErrors: { title?: string; timer?: string; questionCount?: string } = {}

        if (!examTitle.trim()) {
            newErrors.title = "Exam title is required"
        }

        if (!examTimer || examTimer <= 0) {
            newErrors.timer = "Valid timer value is required"
        }
        
        if (!questionCount || questionCount < 3) {
            newErrors.questionCount = "Minimum 3 questions required"
        } else if (questionCount > 30) {
            newErrors.questionCount = "Maximum 30 questions allowed for 'Free' plan"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleGenerate = async () => {
        if (!validateForm()) {
            return
        }

        setIsGenerating(true)
        try {
            // Create form data to handle file uploads
            const formData = new FormData();

            // Add file or text content
            if (fileName) {
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                const file = fileInput?.files?.[0];
                if (file) {
                    formData.append('file', file);
                    formData.append('contentType', 'file');
                }
            } else {
                formData.append('text', textContent);
                formData.append('contentType', 'text');
            }

            // Add other exam data
            formData.append('isPrivate', isPrivate.toString());
            formData.append('title', examTitle);
            formData.append('timer', examTimer?.toString() || '');
            formData.append('number_of_question', questionCount?.toString() || '');

            if (tags.length > 0) {
                formData.append('tags', JSON.stringify(tags));
            }

            const response = await axios.post('http://localhost:3001/api/exam/generate',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'multipart/form-data' // Important for file uploads
                    }
                }
            );

            // Redirect to exam preview page with the data from the response
            router.push(`/exam-preview/${response.data.id}`);
        } catch (error: any) {
            // Show error toast with dark theme
            toast.error(error.response?.data?.message || "(Server is busy)\nFailed to generate exam. Please try again later.", {
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
            });
            // Set error message in state as well
            setErrors(prev => ({
                ...prev,
                general: '(Server is busy)\nFailed to generate exam. Please try again later.'
            }));
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Toaster
                position="bottom-right"
            />
            <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Create New Exam</h1>
                    <p className="text-muted-foreground mt-1">Upload content or enter text to generate an exam</p>
                </div>

                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="mb-6 grid grid-cols-2">
                                <TabsTrigger value="upload">Upload PDF</TabsTrigger>
                                <TabsTrigger value="text">Enter Text</TabsTrigger>
                            </TabsList>

                            <TabsContent value="upload" className="space-y-6">
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="p-3 ro</TabsContent>unded-full bg-primary/10">
                                            <FileUp className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Upload PDF Document</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Drag and drop your file here or click to browse
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                onChange={handleFileUpload}
                                            />
                                            <Button variant="outline" className="w-full">
                                                {isUploading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Select File
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        {fileName && (
                                            <div className="text-sm mt-2">
                                                Selected file: <span className="font-medium">{fileName}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="text" className="space-y-6">
                                <div>
                                    <Label htmlFor="content">Enter your content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Paste or type your content here..."
                                        className="min-h-[300px] mt-2"
                                        value={textContent}
                                        onChange={(e) => setTextContent(e.target.value)}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardContent className="pt-6 space-y-6">
                        <div>
                            <Label htmlFor="exam-title">Exam Title</Label>
                            <Input
                                id="exam-title"
                                placeholder="Enter a title for your exam"
                                className="mt-2"
                                value={examTitle}
                                onChange={(e) => setExamTitle(e.target.value)}
                            />
                            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="exam-timer">Timer (minutes)</Label>
                                <p className="text-sm text-muted-foreground">Set a time limit for the exam in minutes</p>
                                <Input
                                    id="exam-timer"
                                    type="number"
                                    placeholder="Enter time in minutes"
                                    min={1}
                                    value={examTimer || ''}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setExamTimer(isNaN(value) ? null : value);
                                    }}
                                />
                                {errors.timer && <p className="text-sm text-destructive mt-1">{errors.timer}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="question-count">Number of Questions</Label>
                                <p className="text-sm text-muted-foreground">Set how many questions to generate (3-30)</p>
                                <Input
                                    id="question-count"
                                    type="number"
                                    placeholder="Enter number of questions"
                                    min={3}
                                    max={30}
                                    value={questionCount || ''}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setQuestionCount(isNaN(value) ? null : value);
                                    }}
                                />
                                {errors.questionCount && <p className="text-sm text-destructive mt-1">{errors.questionCount}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="exam-tags">Tags</Label>
                            <p className="text-sm text-muted-foreground">Add tags to categorize your exam (press Enter to add)</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Input
                                    id="exam-tags"
                                    placeholder="Add a tag..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="private-exam">Private Exam</Label>
                                <p className="text-sm text-muted-foreground">Only invited users can access this exam</p>
                            </div>
                            <Switch id="private-exam" checked={isPrivate} onCheckedChange={setIsPrivate} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleGenerate} disabled={isGenerating || (!fileName && !textContent)}>
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Exam...
                            </>
                        ) : (
                            "Generate Exam"
                        )}
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

