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
import { MockSummary } from "@/components/mock/mocksummary"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"

type Props = {
    params: Promise<{ id: string }>
}

export default function TakeExam({ params }: Props) {
    // const [examId, setExamId] = useState<string | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showSummary, setShowSummary] = useState(true)
    const [timer, setTimer] = useState(60 * 60)

    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
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

    // If still loading or not authenticated, don't render the dashboard
    if (isLoading || !isAuthenticated) {
        return null
    }


    // useEffect(() => {
    //     params.then(({ id }) => setExamId(id))
    // }, [params])

    // if (!examId) {
    //     return <div>Loading...</div>
    // }

    // Mock exam data
    const examData = {
        title: "CSS Layout: Box Model, Float, and Flexbox",
        summary:
            "This exam evaluates knowledge of CSS Box Model, Float, and Flexbox, covering concepts such as spacing, alignment, positioning, responsiveness, and layout strategies.",
        questions: [
            // ---- Box Model Questions (10) ----
            {
                id: 1,
                question: "Which CSS property controls the space between the content and the border of an element?",
                options: ["margin", "padding", "border", "outline"],
                correctAnswer: 1,
            },
            {
                id: 2,
                question: "What is the default box-sizing property for most elements?",
                options: ["content-box", "border-box", "padding-box", "margin-box"],
                correctAnswer: 0,
            },
            {
                id: 3,
                question: "Which property is used to specify the width of an element's border?",
                options: ["border", "border-width", "outline-width", "box-sizing"],
                correctAnswer: 1,
            },
            {
                id: 4,
                question: "What happens when you set margin: auto on a block element?",
                options: ["It is ignored", "The element is centered horizontally", "The element gets maximum margin", "It collapses the margin"],
                correctAnswer: 1,
            },
            {
                id: 5,
                question: "Which CSS property controls whether an element's margins collapse with adjacent margins?",
                options: ["display", "margin-collapse", "overflow", "margin"],
                correctAnswer: 3,
            },
            {
                id: 6,
                question: "What is the difference between border-box and content-box?",
                options: ["border-box includes padding and border", "content-box includes border", "border-box excludes border", "content-box includes padding"],
                correctAnswer: 0,
            },
            {
                id: 7,
                question: "Which CSS property allows setting all four margins at once?",
                options: ["margin", "padding", "border", "box-sizing"],
                correctAnswer: 0,
            },
            {
                id: 8,
                question: "Which of the following does NOT affect an element's total width?",
                options: ["margin", "padding", "border", "line-height"],
                correctAnswer: 3,
            },
            {
                id: 9,
                question: "What is the purpose of the outline property in CSS?",
                options: ["To create a space around an element", "To add a border-like effect that does not affect layout", "To control spacing inside an element", "To define text decoration"],
                correctAnswer: 1,
            },
            {
                id: 10,
                question: "If two adjacent block elements have margins, what happens by default?",
                options: ["The margins add up", "The larger margin is used", "The smaller margin is used", "The margins collapse"],
                correctAnswer: 3,
            },

            // ---- Float Questions (10) ----
            {
                id: 11,
                question: "What happens if you float all child elements inside a parent without clearing the float?",
                options: [
                    "The parent collapses and has zero height",
                    "The parent expands to fit the children",
                    "The float property is ignored",
                    "An error occurs"
                ],
                correctAnswer: 0,
            },
            {
                id: 12,
                question: "Which CSS property can be used to clear a float?",
                options: ["display", "clear", "overflow", "position"],
                correctAnswer: 1,
            },
            {
                id: 13,
                question: "What value of 'clear' is used to clear floating elements on both sides?",
                options: ["left", "right", "both", "none"],
                correctAnswer: 2,
            },
            {
                id: 14,
                question: "Which technique ensures a parent element contains floated children?",
                options: ["Adding overflow: hidden to the parent", "Using position: relative", "Applying display: block", "Setting a fixed height"],
                correctAnswer: 0,
            },
            {
                id: 15,
                question: "What happens when multiple floated elements are placed next to each other?",
                options: ["They overlap", "They stack vertically", "They align horizontally", "They disappear"],
                correctAnswer: 2,
            },
            {
                id: 16,
                question: "How does setting 'display: inline-block' differ from using 'float'?",
                options: ["It allows block elements to sit inline", "It clears floats automatically", "It prevents elements from wrapping", "It forces elements into a grid"],
                correctAnswer: 0,
            },
            {
                id: 17,
                question: "What is a common issue when using floats for layouts?",
                options: ["Elements may overlap unexpectedly", "Floats require flexbox", "Floated elements are always block-level", "The float property cannot be overridden"],
                correctAnswer: 0,
            },
            {
                id: 18,
                question: "What CSS property is often used as an alternative to floats for layout design?",
                options: ["grid", "position", "display", "overflow"],
                correctAnswer: 0,
            },
            {
                id: 19,
                question: "What happens if a floated element is wider than its container?",
                options: ["It overflows", "It shrinks", "It wraps", "It disappears"],
                correctAnswer: 0,
            },
            {
                id: 20,
                question: "Which method can be used to stop text from wrapping around a floated element?",
                options: ["display: inline-block", "overflow: auto", "clear: both", "width: 100%"],
                correctAnswer: 2,
            },
            {
                "id": 21,
                "question": "Which CSS property defines how flex items are placed in the flex container along the main axis?",
                "options": ["align-items", "justify-content", "flex-direction", "align-self"],
                "correctAnswer": 1
            },
            {
                "id": 22,
                "question": "What is the default value of the 'flex-direction' property?",
                "options": ["row", "column", "row-reverse", "column-reverse"],
                "correctAnswer": 0
            },
            {
                "id": 23,
                "question": "Which flexbox property is used to allow items to grow and shrink within the container?",
                "options": ["flex-basis", "flex-wrap", "flex", "order"],
                "correctAnswer": 2
            },
            {
                "id": 24,
                "question": "What value of 'align-items' should be used to align flex items at the start of the cross axis?",
                "options": ["center", "flex-end", "flex-start", "stretch"],
                "correctAnswer": 2
            },
            {
                "id": 25,
                "question": "Which property prevents flex items from shrinking?",
                "options": ["flex-grow", "flex-shrink", "flex-wrap", "align-content"],
                "correctAnswer": 1
            },
            {
                "id": 26,
                "question": "What does 'flex-wrap: wrap' do?",
                "options": ["Forces items to stay in a single line", "Allows items to wrap onto multiple lines", "Aligns items in a column", "Disables flexbox"],
                "correctAnswer": 1
            },
            {
                "id": 27,
                "question": "How do you change the order of flex items?",
                "options": ["Using 'order'", "Using 'align-items'", "Using 'justify-content'", "Using 'flex-basis'"],
                "correctAnswer": 0
            },
            {
                "id": 28,
                "question": "Which property sets the initial size of a flex item before any growing or shrinking?",
                "options": ["flex-grow", "flex-basis", "flex-shrink", "order"],
                "correctAnswer": 1
            },
            {
                "id": 29,
                "question": "What is the purpose of 'align-content' in flexbox?",
                "options": ["Aligns items along the cross-axis", "Aligns lines of flex items in a multi-line flex container", "Justifies content along the main axis", "Changes item order"],
                "correctAnswer": 1
            },
            {
                "id": 30,
                "question": "Which property controls how a flex item grows relative to other items?",
                "options": ["flex-basis", "flex-grow", "align-items", "justify-content"],
                "correctAnswer": 1
            },
            {
                "id": 31,
                "question": "Which value of 'justify-content' places items evenly with equal space around them?",
                "options": ["space-between", "space-around", "center", "flex-start"],
                "correctAnswer": 1
            },
            {
                "id": 32,
                "question": "If you want a flex item to take twice the space of others, which value of 'flex-grow' should you use?",
                "options": ["0", "1", "2", "3"],
                "correctAnswer": 2
            },
            {
                "id": 33,
                "question": "Which property specifies whether flex items are forced onto a single line or can wrap?",
                "options": ["align-items", "flex-wrap", "order", "flex-direction"],
                "correctAnswer": 1
            },
            {
                "id": 34,
                "question": "What is the purpose of 'align-self' in flexbox?",
                "options": ["Aligns all items in the container", "Aligns a single flex item individually", "Justifies items along the main axis", "Controls item growth"],
                "correctAnswer": 1
            },
            {
                "id": 35,
                "question": "Which value of 'justify-content' aligns items to the start of the main axis?",
                "options": ["center", "flex-start", "flex-end", "space-between"],
                "correctAnswer": 1
            },
            {
                "id": 36,
                "question": "Which value of 'align-items' stretches flex items to fill the container?",
                "options": ["flex-start", "flex-end", "center", "stretch"],
                "correctAnswer": 3
            },
            {
                "id": 37,
                "question": "What does 'order: -1' do to a flex item?",
                "options": ["Moves it to the end", "Moves it to the start", "Hides it", "Removes it from flexbox"],
                "correctAnswer": 1
            },
            {
                "id": 38,
                "question": "How can you center an item both horizontally and vertically using flexbox?",
                "options": [
                    "justify-content: center; align-items: center;",
                    "align-self: center;",
                    "flex-direction: column;",
                    "order: 0;"
                ],
                "correctAnswer": 0
            },
            {
                "id": 39,
                "question": "Which property is used to distribute extra space between flex items?",
                "options": ["align-content", "justify-content", "flex-grow", "order"],
                "correctAnswer": 2
            },
            {
                "id": 40,
                "question": "Which flexbox property allows an item to be aligned differently from other items in the same container?",
                "options": ["flex-grow", "flex-basis", "align-self", "justify-content"],
                "correctAnswer": 2
            }
        ],
    };

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
                        <CardFooter className="flex flex-col sm:flex-row gap-4 flex-wrap">
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
                                {/* <p className="whitespace-pre-line">{examData.summary}</p> */}
                                <MockSummary></MockSummary>
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
                            <p className="whitespace-pre-line">{examData.summary}</p>
                            <MockSummary></MockSummary>
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
                            <CardTitle className="text-xl select-none cursor-default">{currentQuestionData.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup
                                key={currentQuestion}
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
                }
                {Object.keys(answers).length < examData.questions.length && !showSummary && (
                    <div className="mt-4 text-sm text-muted-foreground text-center">Answer all questions to submit the exam</div>
                )}
            </main>

            <Footer />
        </div>
    )
}

