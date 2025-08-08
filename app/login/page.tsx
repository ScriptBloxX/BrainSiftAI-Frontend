"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import axiosInstance from "@/lib/axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  useEffect(() => {
    // Check for password reset success message
    const resetSuccess = searchParams.get("reset")
    if (resetSuccess === "success") {
      setSuccessMessage("Your password has been reset successfully. You can now log in with your new password.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields")
      }

      const response = await axiosInstance.post(`/api/authentication/login`, {
        usernameOrEmail: email,
        password: password,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Invalid username/email or password");
      }

      // Set authenticated state
      login({
        id: response.data.id,
        email: response.data.email,
        name: response.data.username,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        role: response.data.role,
        plan: response.data.plan,
        isEmailVerified: response.data.isEmailVerified,
        profileUrl: response.data.profileUrl,
        creditsRemaining: response.data.creditsRemaining
      })

      // Check for redirect URL and redirect back, otherwise go to dashboard
      const redirectUrl = searchParams.get("redirect")
      if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error_message || err.response.data.error);
      } else {
        setError(err.message || String(err));
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
              <CardTitle className="text-2xl font-bold">Log in</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4 flex items-center gap-4">
                  <div> <AlertCircle className="h-5 w-5" /> </div>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="mb-4 border-green-500 text-green-500">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link 
                  href={`/signup${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`} 
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
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

