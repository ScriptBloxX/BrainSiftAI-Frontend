"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, Timer } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import axiosInstance from "@/lib/axios"
import Summary from "@/components/summary"
import LoadingScreen from "@/components/loading-screen"

type Props = {
    params: Promise<{ id: string }>
}

export default function TakeExam({ params }: Props) {
    const [examId, setExamId] = useState<string | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showSummary, setShowSummary] = useState(true)
    const [timer, setTimer] = useState(-1)
    const [examData, setExamData] = useState<{ 
        title?: string; 
        summary?: []; 
        questions: { 
            id: string;
            questionText: string; 
            options: string[]; 
            correctAnswer?: number 
        }[] 
    }>({ questions: [] });
    const [loadingScreen,setLoadingScreen] = useState(true);
    const [showAnswerKey, setShowAnswerKey] = useState(false)
    const [examResult, setExamResult] = useState<{
        examId: string;
        examTitle: string;
        score: number;
        correctAnswers: number;
        totalQuestions: number;
        percentage: number;
        solutions: {
            questionId: string;
            correctAnswer: number;
        }[];
    } | null>(null)
    
    const { isAuthenticated, isLoading, getToken } = useAuth()
    const router = useRouter()

    useEffect(() => {
        params.then(({ id }) => {
            const examIdFromUrl = window.location.pathname.split("/exam/")[1];
            setExamId(examIdFromUrl || id);
        });
    }, [params])
    useEffect(() => {
        if (examId) {
            axiosInstance
                .get(`/api/exam/${examId}`)
                .then((response: any) => {
                    setExamData(response.data);
                    setTimer(response.data.timer_minute*60);
                })
                .catch(() => {
                    router.push("/explore");
                }).finally(()=>{
                    setLoadingScreen(false);
                })
        }
    }, [examId]);
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // Store current URL for redirect after login
            const currentPath = window.location.pathname
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
        }
    }, [isAuthenticated, isLoading, router])
    useEffect(() => {
        if (!showSummary && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else if (timer === 0) {
            setIsSubmitted(true)
        }
    }, [showSummary, timer])

    if (isLoading || !isAuthenticated || !examId || !examData) {
        return null
    }

    const handleAnswerChange = (value: string) => {
        const answerIndex = Number.parseInt(value.split("-")[1])
        const currentQuestionId = examData.questions[currentQuestion]?.id
        if (currentQuestionId) {
            setAnswers({
                ...answers,
                [currentQuestionId]: answerIndex,
            })
        }
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

    const submitExam = async () => {
        if (!examId) return;
        
        // Convert answers to the required format
        const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer
        }));

        try {
            const response = await axiosInstance.post(
                `/api/exam/submit`,
                {
                    examId,
                    answers: formattedAnswers
                }
            );
            
            setExamResult(response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting exam:', error);
            // Fallback to old scoring method if API fails
            setIsSubmitted(true);
        }
    }

    const calculateScore = () => {
        // If API result, use it
        if (examResult) {
            return {
                correct: examResult.correctAnswers,
                total: examResult.totalQuestions,
                percentage: examResult.percentage,
            };
        }
        
        // Fallback to old method for backward compatibility
        let correctCount = 0
        examData.questions.forEach((question, index) => {
            const userAnswer = answers[question.id];
            if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
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
    const currentQuestionId = currentQuestionData?.id
    const hasAnsweredCurrent = currentQuestionId ? answers[currentQuestionId] !== undefined : false
    const allQuestionsAnswered = examData.questions.every(q => q.id && answers[q.id] !== undefined)

    if (loadingScreen) return <LoadingScreen/>

    if (isSubmitted) {
        return (            
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Exam Completed!</CardTitle>
                            <CardDescription>You've completed the {examResult?.examTitle || examData.title} exam</CardDescription>
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
                        <CardFooter className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <Button variant="outline" className="w-full" onClick={() => setShowSummary(!showSummary)}>
                                {showSummary ? "Hide Content Summary" : "View Content Summary"}
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => setShowAnswerKey(!showAnswerKey)}>
                                {showAnswerKey ? "Hide Answers" : "View Answers"}
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
                                <Summary content={examData.summary || []}></Summary>
                            </CardContent>
                        </Card>
                    )}

                    {showAnswerKey && (
                        <Card className="max-w-2xl mx-auto mt-8">
                            <CardHeader>
                                <CardTitle>Answer Key</CardTitle>
                                <CardDescription>See correct answers and your responses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {examData.questions.map((question, qIndex) => {
                                        // Get correct answer from API result or fallback to question data
                                        const correctAnswer = examResult?.solutions.find(s => s.questionId === question.id)?.correctAnswer ?? question.correctAnswer;
                                        const userSelected = answers[question.id];
                                        
                                        return (
                                            <div key={qIndex} className="border rounded-lg p-4">
                                                <h3 className="font-medium mb-2">{qIndex + 1}. {question.questionText}</h3>
                                                <div className="space-y-2">
                                                    {question.options.map((option, oIndex) => {
                                                        const isCorrect = oIndex === correctAnswer;
                                                        const isUserSelected = userSelected === oIndex;
                                                        
                                                        let bgColor = "";
                                                        if (isCorrect) {
                                                            bgColor = "bg-green-100 dark:bg-green-900/30";
                                                        } else if (isUserSelected) {
                                                            bgColor = "bg-red-100 dark:bg-red-900/30";
                                                        }
                                                        
                                                        return (
                                                            <div 
                                                                key={oIndex} 
                                                                className={`flex items-center p-2 rounded-md ${bgColor}`}
                                                            >
                                                                <div className="w-6 h-6 flex items-center justify-center mr-2">
                                                                    {isCorrect && (
                                                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                                    )}
                                                                    {isUserSelected && !isCorrect && (
                                                                        <span className="h-5 w-5 text-red-600 dark:text-red-400 font-bold">✕</span>
                                                                    )}
                                                                </div>
                                                                <span>
                                                                    {option}
                                                                    {isCorrect && " (Correct Answer)"}
                                                                    {isUserSelected && !isCorrect && " (Your Answer)"}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
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
                    <p>[Temporary API, Everything is sh*t]</p>
                    <h1 className="text-3xl font-bold tracking-tight">{examData.title}</h1>
                    <div className="flex items-center justify-between mt-4">
                        {showSummary ? null :
                            <>
                                <p className="text-sm text-muted-foreground">
                                    Question {currentQuestion + 1} of {examData.questions.length}
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <p>{`${Math.floor(timer / 60)
                                        .toString()
                                        .padStart(2, "0")}:${(timer % 60)
                                            .toString()
                                            .padStart(2, "0")}s`}</p>
                                    <Timer />
                                </div>
                            </>
                        }
                    </div>
                    {showSummary ? null :
                        <Progress value={progress} className="mt-2" />
                    }
                </div>

                {showSummary && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Content Summary</CardTitle>
                            <CardDescription>Review this summary before taking the exam</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Summary content={examData.summary || []}></Summary>
                            {showSummary ?
                                <div className="mt-4 cursor-pointer w-full bg-primary text-center text-primary-foreground rounded-md py-2" onClick={() => setShowSummary(!showSummary)}>
                                    {showSummary ? "Ready" : "View Summary"}
                                </div>
                                : null
                            }
                        </CardContent>
                    </Card>
                )}

                {showSummary ? null :
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl select-none cursor-default">{currentQuestionData.questionText}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup
                                key={currentQuestion}
                                value={currentQuestionId && answers[currentQuestionId] !== undefined ? `option-${answers[currentQuestionId]}` : undefined}
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
                                <Button onClick={submitExam} disabled={!allQuestionsAnswered}>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Submit Exam
                                </Button>
                            ) : (
                                <Button onClick={nextQuestion} disabled={!hasAnsweredCurrent}>
                                    Next <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                }
                {!allQuestionsAnswered && !showSummary && (
                    <div className="mt-4 text-sm text-muted-foreground text-center">Answer all questions to submit the exam</div>
                )}
            </main>

            <Footer />
        </div>
    )
}

