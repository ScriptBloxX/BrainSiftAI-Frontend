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
import { FileUp, Upload, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"

export default function CreateExam() {
    const [isUploading, setIsUploading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const [textContent, setTextContent] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    // If still loading or not authenticated, don't render the page
    // if (isLoading || !isAuthenticated) {
    //     return null
    // }

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

    const handleGenerate = () => {
        setIsGenerating(true)

        // Simulate AI processing delay
        setTimeout(() => {
            setIsGenerating(false)
            // In a real app, we would redirect to the exam preview page
            router.push("/exam-preview/123")
        }, 3000)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

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
                                        <div className="p-3 rounded-full bg-primary/10">
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
                            <Input id="exam-title" placeholder="Enter a title for your exam" className="mt-2" />
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

