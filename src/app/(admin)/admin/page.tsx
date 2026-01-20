"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Users, Store, Bike, Map as MapIcon, ShieldAlert } from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-red-600">GOD MODE</h1>
                    <p className="text-muted-foreground">System Overview & Control Center</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-500" /> System Alerts (0)
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">1,240</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                        <Store className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">45</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
                        <Bike className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">32</div><p className="text-xs text-green-500">28 Online</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Live Orders</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">18</div></CardContent>
                </Card>
            </div>

            {/* HEATMAP PLACEHOLDER (Real implementation would use Leaflet Heatmap plugin) */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1 min-h-[400px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapIcon className="h-5 w-5" /> Live Heatmap
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px] bg-slate-100 rounded-md flex items-center justify-center border-2 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <MapIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Live GPS Tracking & Demand Heatmap</p>
                            <p className="text-xs">(Requires Active Rider Data)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader><CardTitle>Platform Revenue</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                                <span>Total Volume</span>
                                <span className="font-bold text-xl">KES 1.2M</span>
                            </div>
                            <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-200">
                                <span className="text-green-800">Platform Commission (20%)</span>
                                <span className="font-bold text-xl text-green-700">KES 240,000</span>
                            </div>
                            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <span className="text-blue-800">Tax Collected</span>
                                <span className="font-bold text-xl text-blue-700">KES 12,000</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
