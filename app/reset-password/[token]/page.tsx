"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import axiosInstance from "@/lib/axios"

export default function ResetPassword({ params }: { params: Promise<{ token: string }> }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params
      setToken(resolvedParams.token)
    }
    fetchParams()
  }, [params])

  const isValidToken = token && token.length > 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simple validation
      if (!password || !confirmPassword) {
        throw new Error("Please fill in all fields")
      }

      const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRequirements.test(password)) {
        throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Call reset password API
      await axiosInstance.patch('/api/user/reset-password', {
        token: token,
        password: password
      })

      // Redirect to login page with success message
      router.push("/login?reset=success")
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error_message || err.response.data.error || "Failed to reset password")
      } else {
        setError(err.message || "An error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidToken) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col min-h-screen items-center">

          <main className="flex-1 container flex items-center justify-center py-12 mt-16">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Invalid or expired link</CardTitle>
                <CardDescription>This password reset link is invalid or has expired.</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>Please request a new password reset link.</AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <Link href="/forgot-password">Request new reset link</Link>
                </Button>
              </CardFooter>
            </Card>
          </main>

          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center">

        <main className="flex-1 container flex items-center justify-center py-12 mt-16">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
              <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4 flex items-center gap-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>
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

