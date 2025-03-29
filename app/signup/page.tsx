"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import axios from "axios";

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const { login } = useAuth()

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://brain-sift-ai-backend.onrender.com";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {

            // Simple validation
            if (!name || !email || !password || !confirmPassword) {
                throw new Error("Please fill in all fields")
            }

            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters")
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match")
            }

            if (!acceptTerms) {
                throw new Error("You must accept the terms and conditions")
            }

            // Set authenticated state
            const response = await axios.post(`${API_BASE_URL}/api/user/`, {
                username: name,
                password: password,
                email: email,
            });

            login({
                email: response.data.email,
                name: response.data.username,
                token: response.data.token,
                role: response.data.role,
                plan: response.data.plan,
                isEmailVerified: response.data.isEmailVerified,
                profileUrl: response.data.profileUrl,
            })

            // Redirect to dashboard
            router.push("/dashboard")
        } catch (err) {
            console.log(err)
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error_message || err.response.data.error);
            } else {
                setError(err instanceof Error ? err.message : String(err));
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen items-center">
                <main className="flex-1 container flex items-center justify-center py-12 px-4 mt-16">
                    <Card className="w-full max-w-md">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                            <CardDescription>Enter your information to create an account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4 flex items-center gap-4">
                                    <div> <AlertCircle className="h-5 w-5" /> </div>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={acceptTerms}
                                        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I accept the{" "}
                                        <Link href="/terms" className="text-primary hover:underline">
                                            terms and conditions
                                        </Link>
                                    </label>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Sign up"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary font-medium hover:underline">
                                    Log in
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </main>

                <Footer />
            </div>
        </>
    )
}

