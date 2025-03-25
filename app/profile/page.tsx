"use client"

import { Switch } from "@/components/ui/switch"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Lock, Bell } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"

export default function Profile() {
    const { user, isAuthenticated, isLoading } = useAuth();
    // Mock data for test
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    // If still loading or not authenticated, don't render the profile
    if (isLoading || !isAuthenticated) {
        return null
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center">
                                    <Avatar className="h-24 w-24 mb-4">
                                        <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold">{user?.name}</h2>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                    <Button variant="outline" className="mt-4 w-full">
                                        Change Avatar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:w-2/3">
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className="mb-6 grid grid-cols-3">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>

                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Information</CardTitle>
                                        <CardDescription>Update your account details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <div className="flex gap-2">
                                                <User className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input id="name" defaultValue={user?.name} className="flex-1" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <div className="flex gap-2">
                                                <Mail className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input id="email" type="email" defaultValue={user?.email} className="flex-1" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save Changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security Settings</CardTitle>
                                        <CardDescription>Manage your password and security preferences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <div className="flex gap-2">
                                                <Lock className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input id="current-password" type="password" className="flex-1" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <div className="flex gap-2">
                                                <Lock className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input id="new-password" type="password" className="flex-1" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <div className="flex gap-2">
                                                <Lock className="h-4 w-4 mt-3 text-muted-foreground" />
                                                <Input id="confirm-password" type="password" className="flex-1" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Update Password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="notifications">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Preferences</CardTitle>
                                        <CardDescription>Manage how you receive notifications</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Email Notifications</p>
                                                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                                </div>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Exam Completions</p>
                                                    <p className="text-sm text-muted-foreground">Get notified when someone completes your exam</p>
                                                </div>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Class Invitations</p>
                                                    <p className="text-sm text-muted-foreground">Get notified about new class invitations</p>
                                                </div>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save Preferences</Button>
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

