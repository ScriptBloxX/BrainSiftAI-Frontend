"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

type Props = {
    params: Promise<{ id: string }>
}

export default function TakeExam({ params }: Props) {
    // const [examId, setExamId] = useState<string | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showSummary, setShowSummary] = useState(false)

    // useEffect(() => {
    //     params.then(({ id }) => setExamId(id))
    // }, [params])

    // if (!examId) {
    //     return <div>Loading...</div>
    // }

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

    const handleAnswerChange = (value: string) => {
        const answerIndex = Number.parseInt(value.split("-")[1])
        setAnswers({
            ...answers,
            [currentQuestion]: answerIndex,
        })
    }

    const nextQuestion = () => {
        if (currentQuestion < examData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const submitExam = () => {
        setIsSubmitted(true)
    }

    const calculateScore = () => {
        let correctCount = 0
        Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
            const question = examData.questions[Number.parseInt(questionIndex)]
            if (answerIndex === question.correctAnswer) {
                correctCount++
            }
        })
        return {
            correct: correctCount,
            total: examData.questions.length,
            percentage: Math.round((correctCount / examData.questions.length) * 100),
        }
    }

    const score = calculateScore()
    const progress = ((currentQuestion + 1) / examData.questions.length) * 100
    const currentQuestionData = examData.questions[currentQuestion]
    const hasAnsweredCurrent = answers[currentQuestion] !== undefined

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Exam Completed!</CardTitle>
                            <CardDescription>You've completed the {examData.title} exam</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="relative w-32 h-32 mb-4">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold">{score.percentage}%</span>
                                    </div>
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-muted-foreground/20"
                                            strokeWidth="10"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-primary"
                                            strokeWidth="10"
                                            strokeDasharray={251.2}
                                            strokeDashoffset={251.2 - (251.2 * score.percentage) / 100}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium">
                                    You got {score.correct} out of {score.total} questions correct
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">Performance Summary</h3>
                                <div className="bg-muted p-4 rounded-lg">
                                    <p>
                                        {score.percentage >= 80
                                            ? "Excellent work! You have a strong understanding of the material."
                                            : score.percentage >= 60
                                                ? "Good job! You have a solid grasp of most concepts."
                                                : "You might want to review the material again to strengthen your understanding."}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-4">
                            <Button variant="outline" className="w-full" onClick={() => setShowSummary(!showSummary)}>
                                {showSummary ? "Hide Content Summary" : "View Content Summary"}
                            </Button>
                            <Button className="w-full" asChild>
                                <a href="/dashboard">Return to Dashboard</a>
                            </Button>
                        </CardFooter>
                    </Card>

                    {showSummary && (
                        <Card className="max-w-2xl mx-auto mt-8">
                            <CardHeader>
                                <CardTitle>Content Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-line">{examData.summary}</p>
                            </CardContent>
                        </Card>
                    )}
                </main>

                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">{examData.title}</h1>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Question {currentQuestion + 1} of {examData.questions.length}
                        </p>
                        <Button variant="outline" size="sm" onClick={() => setShowSummary(!showSummary)}>
                            {showSummary ? "Hide Summary" : "View Summary"}
                        </Button>
                    </div>
                    <Progress value={progress} className="mt-2" />
                </div>

                {showSummary && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Content Summary</CardTitle>
                            <CardDescription>Review this summary before taking the exam</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-line">{examData.summary}</p>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={answers[currentQuestion] !== undefined ? `option-${answers[currentQuestion]}` : undefined}
                            onValueChange={handleAnswerChange}
                        >
                            {currentQuestionData.options.map((option, i) => (
                                <div key={i} className="flex items-center space-x-2 py-2">
                                    <RadioGroupItem value={`option-${i}`} id={`option-${i}`} />
                                    <Label htmlFor={`option-${i}`} className="flex-1">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>

                        {currentQuestion === examData.questions.length - 1 ? (
                            <Button onClick={submitExam} disabled={Object.keys(answers).length < examData.questions.length}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Submit Exam
                            </Button>
                        ) : (
                            <Button onClick={nextQuestion} disabled={!hasAnsweredCurrent}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                {Object.keys(answers).length < examData.questions.length && (
                    <div className="mt-4 text-sm text-muted-foreground text-center">Answer all questions to submit the exam</div>
                )}
            </main>

            <Footer />
        </div>
    )
}

