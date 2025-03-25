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
    const [showSummary, setShowSummary] = useState(false)

    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

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
        title: "JavaScript: Arrays, Strings, and Regular Expressions",
        summary:
            "This exam evaluates knowledge of JavaScript's built-in methods for arrays, strings, and regular expressions, covering concepts such as iteration, transformation, pattern matching, and manipulation.",
        questions: [
            // ---- Array Questions (20) ----
            {
                id: 1,
                question: "Which method creates a new array with only the elements that pass a test?",
                options: ["map()", "filter()", "reduce()", "slice()"],
                correctAnswer: 1,
            },
            {
                id: 2,
                question: "What does the `.map()` method return?",
                options: ["A new array", "A single value", "The same array", "A boolean"],
                correctAnswer: 0,
            },
            {
                id: 3,
                question: "Which method removes the last element from an array?",
                options: ["pop()", "shift()", "splice()", "slice()"],
                correctAnswer: 0,
            },
            {
                id: 4,
                question: "What does `Array.isArray([1,2,3])` return?",
                options: ["true", "false", "null", "undefined"],
                correctAnswer: 0,
            },
            {
                id: 5,
                question: "What will `[1, 2, 3].concat([4, 5])` return?",
                options: ["[1, 2, 3, 4, 5]", "[[1, 2, 3], [4, 5]]", "[4, 5, 1, 2, 3]", "Error"],
                correctAnswer: 0,
            },
            {
                id: 6,
                question: "Which method adds one or more elements to the end of an array?",
                options: ["push()", "unshift()", "concat()", "slice()"],
                correctAnswer: 0,
            },
            {
                id: 7,
                question: "What does `[1, 2, 3].reverse()` return?",
                options: ["[1, 2, 3]", "[3, 2, 1]", "Error", "undefined"],
                correctAnswer: 1,
            },
            {
                id: 8,
                question: "Which method merges two or more arrays into one?",
                options: ["merge()", "concat()", "spread operator (...)", "Both B and C"],
                correctAnswer: 3,
            },
            {
                id: 9,
                question: "What does `[1, 2, 3].includes(2)` return?",
                options: ["true", "false", "null", "undefined"],
                correctAnswer: 0,
            },
            {
                id: 10,
                question: "Which method executes a function once per array element?",
                options: ["map()", "forEach()", "filter()", "reduce()"],
                correctAnswer: 1,
            },
            {
                id: 11,
                question: "Which method removes the first element of an array and returns it?",
                options: ["pop()", "shift()", "slice()", "splice()"],
                correctAnswer: 1,
            },
            {
                id: 12,
                question: "What will `[1, 2, 3, 4].slice(1, 3)` return?",
                options: ["[1, 2, 3]", "[2, 3]", "[3, 4]", "[2, 3, 4]"],
                correctAnswer: 1,
            },
            {
                id: 13,
                question: "Which method sorts the elements of an array in place?",
                options: ["sort()", "order()", "reverse()", "map()"],
                correctAnswer: 0,
            },
            {
                id: 14,
                question: "What does `[1, 2, 3].some(x => x > 2)` return?",
                options: ["true", "false", "[3]", "undefined"],
                correctAnswer: 0,
            },
            {
                id: 15,
                question: "Which method flattens a nested array into a single-level array?",
                options: ["reduce()", "concat()", "flat()", "map()"],
                correctAnswer: 2,
            },
            {
                id: 16,
                question: "What will `[1, 2, 3].fill(0, 1, 3)` return?",
                options: ["[1, 2, 3]", "[1, 0, 3]", "[1, 0, 0]", "[0, 0, 0]"],
                correctAnswer: 2,
            },
            {
                id: 17,
                question: "Which method finds the index of the first element that satisfies a condition?",
                options: ["find()", "findIndex()", "indexOf()", "some()"],
                correctAnswer: 1,
            },
            {
                id: 18,
                question: "What does `[1, 2, 3].every(x => x > 0)` return?",
                options: ["true", "false", "[1, 2, 3]", "undefined"],
                correctAnswer: 0,
            },
            {
                id: 19,
                question: "Which of the following creates a shallow copy of an array?",
                options: ["slice()", "copy()", "duplicate()", "spread operator (...)"],
                correctAnswer: 3,
            },
            {
                id: 20,
                question: "What will `[1, 2, 3].reduce((acc, cur) => acc + cur, 0)` return?",
                options: ["6", "[1, 2, 3]", "0", "Error"],
                correctAnswer: 0,
            },
            // ---- String Questions (20) ----
            {
                id: 21,
                question: "Which method converts a string into an array?",
                options: ["split()", "slice()", "substring()", "trim()"],
                correctAnswer: 0,
            },
            {
                id: 22,
                question: "What does `str.toUpperCase()` do?",
                options: ["Converts string to lowercase", "Removes spaces", "Converts string to uppercase", "Does nothing"],
                correctAnswer: 2,
            },
            {
                id: 23,
                question: "Which method removes whitespace from both ends of a string?",
                options: ["trim()", "slice()", "substring()", "replace()"],
                correctAnswer: 0,
            },
            {
                id: 24,
                question: "What will `'hello'.charAt(1)` return?",
                options: ["'h'", "'e'", "'l'", "'o'"],
                correctAnswer: 1,
            },
            {
                id: 25,
                question: "Which method replaces text in a string?",
                options: ["replace()", "splice()", "slice()", "split()"],
                correctAnswer: 0,
            },
            {
                id: 26,
                question: "What will `'Hello'.charCodeAt(1)` return?",
                options: ["'e'", "101", "1", "NaN"],
                correctAnswer: 1,
            },
            {
                id: 27,
                question: "Which method checks if a string starts with a specified substring?",
                options: ["startsWith()", "endsWith()", "includes()", "match()"],
                correctAnswer: 0,
            },
            {
                id: 28,
                question: "What will `'hello world'.indexOf('o')` return?",
                options: ["4", "5", "-1", "Error"],
                correctAnswer: 0,
            },
            {
                id: 29,
                question: "Which method extracts a portion of a string and returns it as a new string?",
                options: ["substring()", "split()", "replace()", "toUpperCase()"],
                correctAnswer: 0,
            },
            {
                id: 30,
                question: "What does `'apple,banana,grape'.split(',')` return?",
                options: ["['apple', 'banana', 'grape']", "'apple banana grape'", "'apple, banana, grape'", "null"],
                correctAnswer: 0,
            },
            {
                id: 31,
                question: "What is the result of `'hello'.repeat(3)`?",
                options: ["'hellohellohello'", "'hello hello hello'", "'hello3'", "Error"],
                correctAnswer: 0,
            },
            {
                id: 32,
                question: "Which method converts a string to lowercase?",
                options: ["toUpperCase()", "toLowerCase()", "charAt()", "concat()"],
                correctAnswer: 1,
            },
            {
                id: 33,
                question: "What will `'abcdef'.slice(2, 5)` return?",
                options: ["'cde'", "'bcde'", "'def'", "'cdef'"],
                correctAnswer: 0,
            },
            {
                id: 34,
                question: "Which method returns the Unicode value of a character at a specified index?",
                options: ["charAt()", "charCodeAt()", "fromCharCode()", "codePointAt()"],
                correctAnswer: 1,
            },
            {
                id: 35,
                question: "What does `'hello'.replace('h', 'y')` return?",
                options: ["'yello'", "'hello'", "'hyello'", "Error"],
                correctAnswer: 0,
            },
            {
                id: 36,
                question: "Which method joins two strings together?",
                options: ["concat()", "split()", "join()", "push()"],
                correctAnswer: 0,
            },
            {
                id: 37,
                question: "What does `'Hello World'.endsWith('World')` return?",
                options: ["true", "false", "null", "Error"],
                correctAnswer: 0,
            },
            {
                id: 38,
                question: "Which of the following checks whether a string contains a substring?",
                options: ["contains()", "match()", "includes()", "substring()"],
                correctAnswer: 2,
            },
            {
                id: 39,
                question: "What will `'hello world'.lastIndexOf('o')` return?",
                options: ["4", "7", "-1", "Error"],
                correctAnswer: 1,
            },
            {
                id: 40,
                question: "Which method converts a Unicode code point to a character?",
                options: ["charCodeAt()", "codePointAt()", "fromCharCode()", "charAt()"],
                correctAnswer: 2,
            },
            // ---- Regular Expression Questions (20) ----
            {
                id: 41,
                question: "What does `/hello/i` do in JavaScript?",
                options: ["Matches 'hello' case-sensitively", "Matches 'hello' case-insensitively", "Throws an error", "Nothing"],
                correctAnswer: 1,
            },
            {
                id: 42,
                question: "What does the `g` flag in a regex do?",
                options: ["Stops execution", "Matches all occurrences", "Ignores case", "Matches digits only"],
                correctAnswer: 1,
            },
            {
                id: 43,
                question: "What will `'Hello123'.match(/\\d+/)` return?",
                options: ["null", "['123']", "['Hello']", "['Hello', '123']"],
                correctAnswer: 1,
            },
            {
                id: 44,
                question: "Which of the following matches any character except a newline?",
                options: ["\\w", ".", "\\s", "\\d"],
                correctAnswer: 1,
            },
            {
                id: 45,
                question: "Which method tests if a string matches a regex?",
                options: ["test()", "match()", "search()", "replace()"],
                correctAnswer: 0,
            },
            {
                id: 46,
                question: "What does `/\\d+/g` match in 'Year 2025 is amazing'?",
                options: ["'2025'", "['2025']", "['Year', 'is', 'amazing']", "null"],
                correctAnswer: 1,
            },
            {
                id: 47,
                question: "Which regex pattern matches any whitespace character?",
                options: ["\\s", "\\d", "\\w", "\\b"],
                correctAnswer: 0,
            },
            {
                id: 48,
                question: "What will `'hello123'.replace(/\\d+/g, 'X')` return?",
                options: ["'helloX'", "'hello123'", "'hello'", "'helloXXX'"],
                correctAnswer: 0,
            },
            {
                id: 49,
                question: "Which regex pattern matches the word 'JavaScript' at the start of a string?",
                options: ["JavaScript$", "^JavaScript", "/JavaScript/i", "JavaScript?"],
                correctAnswer: 1,
            },
            {
                id: 50,
                question: "What does `/\\bword\\b/` match?",
                options: ["Only the word 'word'", "Any word containing 'word'", "Any character except 'word'", "Numbers only"],
                correctAnswer: 0,
            },
            {
                id: 51,
                question: "What does `/[^a-z]/gi` match?",
                options: ["Only lowercase letters", "Only uppercase letters", "Everything except letters", "Only numbers"],
                correctAnswer: 2,
            },
            {
                id: 52,
                question: "Which flag makes regex match case-insensitively?",
                options: ["g", "i", "m", "s"],
                correctAnswer: 1,
            },
            {
                id: 53,
                question: "What does `/^\\d{4}$/` match?",
                options: ["A four-digit number", "A number with at least 4 digits", "Any number", "No match"],
                correctAnswer: 0,
            },
            {
                id: 54,
                question: "Which regex method returns an array of all matches?",
                options: ["match()", "test()", "replace()", "exec()"],
                correctAnswer: 0,
            },
            {
                id: 55,
                question: "Which regex pattern matches an email format?",
                options: [
                    "/[a-z]+@[a-z]+\\.[a-z]+/i",
                    "/[a-z]*@[a-z]*\\.[a-z]*/",
                    "/\\w+@\\w+\\.\\w+/",
                    "/.*@.*\\..*/"
                ],
                correctAnswer: 2,
            },
            {
                id: 56,
                question: "What will `'apple banana mango'.split(/\\s+/)` return?",
                options: [
                    "['apple banana mango']",
                    "['apple', 'banana', 'mango']",
                    "['a', 'p', 'p', 'l', 'e', 'b', 'a', 'n', 'a', 'n', 'a', 'm', 'a', 'n', 'g', 'o']",
                    "null"
                ],
                correctAnswer: 1,
            },
            {
                id: 57,
                question: "Which regex pattern matches a phone number format '123-456-7890'?",
                options: [
                    "/\\d{3}-\\d{3}-\\d{4}/",
                    "/\\d{10}/",
                    "/\\d{3}.\\d{3}.\\d{4}/",
                    "/(\\d{3}-?\\d{3}-?\\d{4})/"
                ],
                correctAnswer: 0,
            },
            {
                id: 58,
                question: "Which regex pattern ensures that a password contains at least one uppercase letter, one lowercase letter, and one digit?",
                options: [
                    "/[a-zA-Z0-9]{8,}/",
                    "/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/",
                    "/[a-zA-Z0-9]+/",
                    "/\\w+/"
                ],
                correctAnswer: 1,
            },
            {
                id: 59,
                question: "What will `'apple123banana'.match(/\\d+/g)` return?",
                options: ["['123']", "123", "['apple', 'banana']", "null"],
                correctAnswer: 0,
            },
            {
                id: 60,
                question: "Which of the following regex patterns matches a valid URL?",
                options: [
                    "/https?:\\/\\/[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}/",
                    "/[a-z]+.com/",
                    "/www\\..*/",
                    "/[a-z0-9]/"
                ],
                correctAnswer: 0,
            },
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
                            <MockSummary></MockSummary>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
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

                {Object.keys(answers).length < examData.questions.length && (
                    <div className="mt-4 text-sm text-muted-foreground text-center">Answer all questions to submit the exam</div>
                )}
            </main>

            <Footer />
        </div>
    )
}

