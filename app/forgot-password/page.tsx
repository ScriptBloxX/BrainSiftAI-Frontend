"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import axiosInstance from "@/lib/axios"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Simple validation
            if (!email) throw new Error("Please enter your email address")

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) throw new Error("Please enter a valid email address")

            // Call forgot password API
            await axiosInstance.post('/api/user/forgot-password', {
                email: email
            })

            // Show success message
            setIsSuccess(true)
        } catch (err: any) {
            if (err.response) {
                if (err.response.status === 500) {
                    setError("No account found with this email. Please check and try again.")
                } else {
                    setError(err.response.data.error_message || err.response.data.error || "Failed to send reset link")
                }
            } else {
                setError(err.message || "An error occurred")
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
                            <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
                            <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4 flex items-center gap-4">
                                    <div><AlertCircle className="h-4 w-4" /></div>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isSuccess ? (
                                <Alert className="mb-4 border-green-500 text-green-500">
                                    <AlertDescription>
                                        Password reset link sent! Check your email for instructions to reset your password.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
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
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending reset link...
                                            </>
                                        ) : (
                                            "Send reset link"
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-sm text-center text-muted-foreground">
                                Remember your password?{" "}
                                <Link href="/login" className="text-primary font-medium hover:underline">
                                    Back to login
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

