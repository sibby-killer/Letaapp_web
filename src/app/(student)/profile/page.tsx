"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone, Camera, LogOut } from "lucide-react"

export default function StudentProfile() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your contact details and display picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* DP & Basic Info */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-sm">
                                <User className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md">
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-xl">Alfred (Student)</h3>
                            <p className="text-sm text-muted-foreground">alfred@student.mmust.ac.ke</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input placeholder="John Doe" defaultValue="Alfred" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Phone (M-Pesa)</label>
                                <Input placeholder="+254" defaultValue="+254 700 000 000" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Hostel / Location</label>
                                <Input placeholder="Hall 4" />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full md:w-auto">Save Changes</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start gap-3">
                        <Mail className="h-4 w-4" /> Change Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3">
                        <Phone className="h-4 w-4" /> Support & Chat
                    </Button>
                    <Button variant="destructive" className="w-full justify-start gap-3">
                        <LogOut className="h-4 w-4" /> Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
