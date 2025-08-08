"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    User,
    Mail,
    Lock,
    Bell,
    LogOut,
    Trash2,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import axiosInstance from "@/lib/axios"

export default function Settings() {
    const { user, isAuthenticated, isLoading, logout, updateUser, updateProfile } = useAuth()
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [deleteConfirmation, setDeleteConfirmation] = useState("")
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Notification preferences
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [classInvitations, setClassInvitations] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }

        // Populate form with user data if available
        if (user) {
            setName(user.name || "")
            setEmail(user.email || "")
        }
    }, [isAuthenticated, isLoading, router, user])

    // If still loading or not authenticated, don't render the page
    if (isLoading || !isAuthenticated) {
        return null
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)

            // Create a preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAvatarUpload = async () => {
        if (!avatarFile) return

        setIsUploadingAvatar(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            // Update profile picture via API with all fields
            const payload = {
                username: "",
                password: "",
                email: "",
                profileUrl: avatarPreview || ""
            }

            await axiosInstance.patch('/api/user', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // Update the avatar in the user profile
            updateProfile({
                avatar: avatarPreview ?? undefined,
            })

            setSuccessMessage("Profile picture updated successfully")

            // Reset the file input and preview
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            setAvatarFile(null)
            setAvatarPreview(null)
        } catch (error: any) {
            console.error("Failed to upload profile picture:", error)
            setErrorMessage(error.response?.data?.error_message[0] || "Failed to upload profile picture. Please try again.")
        } finally {
            setIsUploadingAvatar(false)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleSaveProfile = async () => {
        setIsSaving(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            // Prepare payload with all fields (can be empty strings)
            const payload = {
                username: name || "",
                currentPassword: "",
                password: "",
                email: email || "",
                profileUrl: ""
            }

            await axiosInstance.patch('/api/user', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // Update user profile in context
            updateUser({ name, email })

            setSuccessMessage("Profile updated successfully")
        } catch (error: any) {
            console.error("Failed to update profile:", error)
            setErrorMessage(error.response?.data?.error_message?.[0] || "Failed to change password. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    const handleChangePassword = async () => {
        setIsSaving(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            // Validate passwords
            if (!currentPassword) {
                throw new Error("Current password is required")
            }

            const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRequirements.test(newPassword)) {
                throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            }

            if (newPassword !== confirmPassword) {
                throw new Error("New passwords do not match")
            }

            const payload = {
                username: "",
                password: newPassword,
                email: "",
                profileUrl: "",
                currentPassword: currentPassword
            }

            await axiosInstance.patch('/api/user', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setSuccessMessage("Password changed successfully")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error: any) {
            console.error("Failed to change password:", error)
            if (typeof error === "object" && error !== null && "response" in error) {
                setErrorMessage(error.response?.data?.error_message?.[0] || "Failed to change password. Please try again.")
            } else if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("Failed to change password. Please try again.")
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handleSaveNotifications = async () => {
        setIsSaving(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 500))

            // setSuccessMessage("Notification preferences updated successfully")
            setErrorMessage("This feature is under development and will be available in a future update.")
        } catch (error) {
            setErrorMessage("Failed to update notification preferences. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== user?.email) {
            setErrorMessage("Please enter your email correctly to confirm account deletion")
            return
        }

        setIsSaving(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            await axiosInstance.delete('/api/user', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // Logout and redirect after successful deletion
            logout()
            router.push("/")
        } catch (error: any) {
            console.error("Failed to delete account:", error)
            setErrorMessage(error.response?.data?.error_message?.[0] || "Failed to change password. Please try again.")
            setIsSaving(false)
        }
    }

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl px-4 md:px-6 py-8 mt-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                        <Card className="sticky top-8">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center">
                                    <Avatar className="h-24 w-24 mb-4">
                                        <AvatarImage src={user?.profile.avatar || "/placeholder.svg?height=96&width=96"} alt={user?.name} />
                                        <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold">{user?.name}</h2>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>

                                    <div className="w-full mt-6 space-y-2">
                                        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:w-3/4">
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className="mb-6 flex flex-wrap h-max justify-center">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>

                            {/* Account Settings */}
                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Information</CardTitle>
                                        <CardDescription>Update your personal information and preferences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {successMessage && (
                                            <Alert className="border-green-500 text-green-500">
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertDescription>{errorMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <div className="flex gap-2">
                                                <User className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <div className="flex gap-2">
                                                <Mail className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>

                                        <Separator />
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                                            {isSaving ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Security Settings */}
                            <TabsContent value="security">
                                <Card className="mb-8">
                                    <CardHeader>
                                        <CardTitle>Change Password</CardTitle>
                                        <CardDescription>Update your password to keep your account secure</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {successMessage && (
                                            <Alert className="border-green-500 text-green-500">
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertDescription>{errorMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <div className="flex gap-2">
                                                <Lock className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input
                                                    id="current-password"
                                                    type="password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <div className="flex gap-2">
                                                <Lock className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input
                                                    id="new-password"
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <div className="flex gap-2">
                                                <Lock className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input
                                                    id="confirm-password"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleChangePassword} disabled={isSaving}>
                                            {isSaving ? "Updating..." : "Update Password"}
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                        <CardDescription>Permanently delete your account and all of your data</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Alert variant="destructive">
                                            <AlertDescription>
                                                This action cannot be undone. This will permanently delete your account and remove all of your
                                                data from our servers.
                                            </AlertDescription>
                                        </Alert>

                                        <div className="space-y-2">
                                            <Label htmlFor="delete-confirmation">
                                                Type your email <span className="font-medium">{user?.email}</span> to confirm
                                            </Label>
                                            <Input
                                                id="delete-confirmation"
                                                value={deleteConfirmation}
                                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                                placeholder="Enter your email to confirm"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            variant="destructive"
                                            onClick={handleDeleteAccount}
                                            disabled={isSaving || deleteConfirmation !== user?.email}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            {isSaving ? "Deleting..." : "Delete Account"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Notification Settings */}
                            <TabsContent value="notifications">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Preferences</CardTitle>
                                        <CardDescription>Manage how you receive notifications</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {successMessage && (
                                            <Alert className="border-green-500 text-green-500">
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertDescription>{errorMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Email Notifications</p>
                                                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                                </div>
                                            </div>
                                            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Class Invitations</p>
                                                    <p className="text-sm text-muted-foreground">Get notified about new class invitations</p>
                                                </div>
                                            </div>
                                            <Switch checked={classInvitations} onCheckedChange={setClassInvitations} />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Marketing Emails</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive updates about new features and promotions
                                                    </p>
                                                </div>
                                            </div>
                                            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleSaveNotifications} disabled={isSaving}>
                                            {isSaving ? "Saving..." : "Save Preferences"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

