"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Plus, Loader2, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-context"

export default function CreateClass() {
  const [className, setClassName] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [accessType, setAccessType] = useState("invite")
  const [emails, setEmails] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  // If still loading or not authenticated, don't render the page
//   if (isLoading || !isAuthenticated) {
//     return null
//   }

  const handleAddEmail = () => {
    if (currentEmail && !emails.includes(currentEmail) && isValidEmail(currentEmail)) {
      setEmails([...emails, currentEmail])
      setCurrentEmail("")
    }
  }

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email))
  }

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddEmail()
    }
  }

  const handleCreateClass = async () => {
    if (!className) return

    setIsCreating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would make an API call to create the class
    // and invite the members

    // Redirect to the class page
    router.push("/private-class/123")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create New Class</h1>
          <p className="text-muted-foreground mt-1">Set up a class and invite students to take your exams</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Class Details</CardTitle>
            <CardDescription>Provide information about your class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="class-name">Class Name</Label>
              <Input
                id="class-name"
                placeholder="Enter a name for your class"
                className="mt-2"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of this class"
                className="mt-2"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Class Settings</CardTitle>
            <CardDescription>Configure access and visibility settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="private-class">Private Class</Label>
                <p className="text-sm text-muted-foreground">Only invited users can access this class</p>
              </div>
              <Switch id="private-class" checked={isPrivate} onCheckedChange={setIsPrivate} />
            </div>

            {isPrivate && (
              <div>
                <Label htmlFor="access-type">Access Type</Label>
                <Select value={accessType} onValueChange={setAccessType}>
                  <SelectTrigger id="access-type" className="mt-2">
                    <SelectValue placeholder="Select access type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invite">Invite Only</SelectItem>
                    <SelectItem value="code">Access Code</SelectItem>
                    <SelectItem value="link">Shareable Link</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  {accessType === "invite" && "Only users you invite can join this class"}
                  {accessType === "code" && "Users need an access code to join this class"}
                  {accessType === "link" && "Anyone with the link can join this class"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Invite Members</CardTitle>
            <CardDescription>Add students or colleagues to your class</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="mb-6 grid grid-cols-2">
                <TabsTrigger value="email">Email Invitations</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-6">
                <div>
                  <Label htmlFor="invite-email">Email Address</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="invite-email"
                      placeholder="Enter email address"
                      type="email"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button onClick={handleAddEmail} type="button">
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>

                {emails.length > 0 && (
                  <div>
                    <Label>Invited Members</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {emails.map((email) => (
                        <Badge key={email} variant="secondary" className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {email}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 p-0"
                            onClick={() => handleRemoveEmail(email)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bulk" className="space-y-6">
                <div>
                  <Label htmlFor="csv-upload">Upload CSV File</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a CSV file with email addresses in the first column
                  </p>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Upload Member List</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Drag and drop your CSV file here or click to browse
                        </p>
                      </div>

                      <Button variant="outline" className="w-full">
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleCreateClass} disabled={isCreating || !className}>
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Class...
              </>
            ) : (
              "Create Class"
            )}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

