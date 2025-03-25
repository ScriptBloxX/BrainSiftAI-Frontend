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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    User,
    Mail,
    Lock,
    Bell,
    Palette,
    Moon,
    Sun,
    Monitor,
    LogOut,
    Trash2,
    Save,
    AlertCircle,
    CheckCircle2,
    Upload,
    Loader2,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useTheme } from "next-themes"

export default function Settings() {
    const { user, isAuthenticated, isLoading, logout, updateUser, updateProfile } = useAuth()
    const { theme, setTheme } = useTheme()
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [language, setLanguage] = useState("english")
    const [timezone, setTimezone] = useState("utc")
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
    const [examCompletions, setExamCompletions] = useState(true)
    const [classInvitations, setClassInvitations] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)

    // Privacy settings
    const [publicProfile, setPublicProfile] = useState(false)
    const [showCompletions, setShowCompletions] = useState(false)
    const [shareActivity, setShareActivity] = useState(false)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }

        // Populate form with user data if available
        if (user) {
            setName(user.name || "")
            setEmail(user.email || "")
            setBio(user.profile.bio || "")
            setLanguage(user.profile.language || "english")
            setTimezone(user.profile.timezone || "utc")
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
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // In a real app, you would upload the file to your server or a storage service
            // const formData = new FormData()
            // formData.append('avatar', avatarFile)
            // const response = await fetch('/api/upload-avatar', { method: 'POST', body: formData })

            // Update the avatar in the user profile
            updateProfile({
                avatar: avatarPreview ?? undefined,
            })

            setSuccessMessage("Profile picture updated successfully")

            // Reset the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        } catch (error) {
            setErrorMessage("Failed to upload profile picture. Please try again.")
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
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Update user profile in context
            updateUser({ name, email })
            updateProfile({
                bio,
            })

            setSuccessMessage("Profile updated successfully")
        } catch (error) {
            setErrorMessage("Failed to update profile. Please try again.")
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

            if (newPassword.length < 8) {
                throw new Error("New password must be at least 8 characters")
            }

            if (newPassword !== confirmPassword) {
                throw new Error("New passwords do not match")
            }

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // In a real app, you would make an API call to change the password
            setSuccessMessage("Password changed successfully")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error) {
            if (error instanceof Error) {
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
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // In a real app, you would make an API call to update notification preferences
            setSuccessMessage("Notification preferences updated successfully")
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
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // In a real app, you would make an API call to delete the account
            logout()
            router.push("/")
        } catch (error) {
            setErrorMessage("Failed to delete account. Please try again.")
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
                            <TabsList className="mb-6 grid grid-cols-4">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
                                                <CheckCircle2 className="h-4 w-4" />
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertDescription>{errorMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="avatar">Profile Picture</Label>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-16 w-16">
                                                    {avatarPreview ? (
                                                        <AvatarImage src={avatarPreview} alt={user?.name} />
                                                    ) : (
                                                        <AvatarImage
                                                            src={user?.profile.avatar || "/placeholder.svg?height=64&width=64"}
                                                            alt={user?.name}
                                                        />
                                                    )}
                                                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm" onClick={triggerFileInput} disabled={isUploadingAvatar}>
                                                            <Upload className="mr-2 h-4 w-4" />
                                                            Select Image
                                                        </Button>
                                                        {avatarFile && (
                                                            <Button size="sm" onClick={handleAvatarUpload} disabled={isUploadingAvatar}>
                                                                {isUploadingAvatar ? (
                                                                    <>
                                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                        Uploading...
                                                                    </>
                                                                ) : (
                                                                    "Upload"
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        id="avatar"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleAvatarChange}
                                                    />
                                                    <p className="text-xs text-muted-foreground">Recommended: Square image, at least 200x200px</p>
                                                </div>
                                            </div>
                                        </div>

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

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Tell us about yourself"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                rows={4}
                                            />
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
                                                <CheckCircle2 className="h-4 w-4" />
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
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
                                            <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
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
                                            <AlertCircle className="h-4 w-4" />
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
                                                <CheckCircle2 className="h-4 w-4" />
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
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
                                                    <p className="font-medium">Exam Completions</p>
                                                    <p className="text-sm text-muted-foreground">Get notified when someone completes your exam</p>
                                                </div>
                                            </div>
                                            <Switch checked={examCompletions} onCheckedChange={setExamCompletions} />
                                        </div>

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

                            {/* Appearance Settings */}
                            <TabsContent value="appearance">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Appearance</CardTitle>
                                        <CardDescription>Customize how BrainSiftAI looks for you</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {successMessage && (
                                            <Alert className="border-green-500 text-green-500">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <AlertDescription>{successMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        {errorMessage && (
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertDescription>{errorMessage}</AlertDescription>
                                            </Alert>
                                        )}

                                        <div className="space-y-2">
                                            <Label>Theme Mode</Label>
                                            <div className="grid grid-cols-3 gap-4">
                                                <Button
                                                    variant={theme === "light" ? "default" : "outline"}
                                                    className="flex flex-col items-center justify-center gap-2 h-24"
                                                    onClick={() => setTheme("light")}
                                                >
                                                    <Sun className="h-6 w-6" />
                                                    <span>Light</span>
                                                </Button>
                                                <Button
                                                    variant={theme === "dark" ? "default" : "outline"}
                                                    className="flex flex-col items-center justify-center gap-2 h-24"
                                                    onClick={() => setTheme("dark")}
                                                >
                                                    <Moon className="h-6 w-6" />
                                                    <span>Dark</span>
                                                </Button>
                                                <Button
                                                    variant={theme === "system" ? "default" : "outline"}
                                                    className="flex flex-col items-center justify-center gap-2 h-24"
                                                    onClick={() => setTheme("system")}
                                                >
                                                    <Monitor className="h-6 w-6" />
                                                    <span>System</span>
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Premium Themes</Label>
                                                {user?.plan === "free" && (
                                                    <Button variant="outline" size="sm" className="text-xs">
                                                        Upgrade to Pro
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
                                                        disabled={user?.plan === "free"}
                                                    >
                                                        <div className="h-6 w-6 rounded-full bg-blue-500" />
                                                        <span>Ocean</span>
                                                    </Button>
                                                    {user?.plan === "free" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800"
                                                        disabled={user?.plan === "free"}
                                                    >
                                                        <div className="h-6 w-6 rounded-full bg-purple-500" />
                                                        <span>Lavender</span>
                                                    </Button>
                                                    {user?.plan === "free" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800"
                                                        disabled={user?.plan === "free"}
                                                    >
                                                        <div className="h-6 w-6 rounded-full bg-amber-500" />
                                                        <span>Sunset</span>
                                                    </Button>
                                                    {user?.plan === "free" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800"
                                                        disabled={user?.plan === "free"}
                                                    >
                                                        <div className="h-6 w-6 rounded-full bg-emerald-500" />
                                                        <span>Forest</span>
                                                    </Button>
                                                    {user?.plan === "free" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                {user?.plan === "free"
                                                    ? "Premium themes are available on Pro and Enterprise plans."
                                                    : "Select a theme to customize the appearance of your dashboard."}
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Color Scheme</Label>
                                                {user?.plan !== "pro" && (
                                                    <Button variant="outline" size="sm" className="text-xs">
                                                        Upgrade to Pro
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full aspect-square mb-2 bg-blue-500 hover:bg-blue-600 text-white border-0"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        <Palette className="h-5 w-5" />
                                                    </Button>
                                                    <span className="text-sm block text-center">Blue</span>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full aspect-square mb-2 bg-purple-500 hover:bg-purple-600 text-white border-0"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        <Palette className="h-5 w-5" />
                                                    </Button>
                                                    <span className="text-sm block text-center">Purple</span>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full aspect-square mb-2 bg-green-500 hover:bg-green-600 text-white border-0"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        <Palette className="h-5 w-5" />
                                                    </Button>
                                                    <span className="text-sm block text-center">Green</span>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full aspect-square mb-2 bg-red-500 hover:bg-red-600 text-white border-0"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        <Palette className="h-5 w-5" />
                                                    </Button>
                                                    <span className="text-sm block text-center">Red</span>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full aspect-square mb-2 bg-amber-500 hover:bg-amber-600 text-white border-0"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        <Palette className="h-5 w-5" />
                                                    </Button>
                                                    <span className="text-sm block text-center">Amber</span>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full aspect-square mb-2 bg-pink-500 hover:bg-pink-600 text-white border-0"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        <Palette className="h-5 w-5" />
                                                    </Button>
                                                    <span className="text-sm block text-center">Pink</span>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                {user?.plan !== "pro"
                                                    ? "Custom color schemes are available on Pro plans only."
                                                    : "Select a primary color to customize your experience."}
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Font Style</Label>
                                                {user?.plan !== "pro" && (
                                                    <div className="text-xs text-muted-foreground">Pro Only</div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-16 font-sans"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        Sans Serif
                                                    </Button>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-16 font-serif"
                                                        disabled={user?.plan !== "pro"}
                                                    >
                                                        Serif
                                                    </Button>
                                                    {user?.plan !== "pro" && (
                                                        <div className="absolute top-2 right-2">
                                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {user?.plan === "free" && (
                                            <div className="mt-6 p-4 bg-muted rounded-lg">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 rounded-full bg-primary/10">
                                                        <Palette className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium">Unlock all appearance options</h4>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            Upgrade to Pro or Enterprise to access premium themes, custom color schemes, and font
                                                            options.
                                                        </p>
                                                        <Button className="mt-3" size="sm">
                                                            View Plans
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => setSuccessMessage("Appearance settings saved successfully")}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Appearance
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

