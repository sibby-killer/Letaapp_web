"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // We might need to create this or use simple spans
import { Bell, CheckCircle2, Clock, ChefHat } from "lucide-react"

// Mock Orders
const MOCK_ORDERS = [
    { id: "ORD-001", items: ["2x Smocha Special", "1x Soda"], total: "KES 250", status: "pending", time: "2 min ago" },
    { id: "ORD-002", items: ["1x Chicken Biryani"], total: "KES 400", status: "preparing", time: "10 min ago" },
    { id: "ORD-003", items: ["3x Chapati", "1x Beans"], total: "KES 150", status: "ready", time: "15 min ago" },
]

export default function VendorDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
                    <p className="text-muted-foreground">Manage your orders and store status.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Store Open
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                        <span className="text-muted-foreground font-bold">KES</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">KES 4,250</div>
                        <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">2 Preparing, 1 Ready</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Store Rating</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.8</div>
                        <p className="text-xs text-muted-foreground">Based on 120 reviews</p>
                    </CardContent>
                </Card>
            </div>

            {/* Orders Kanban */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Pending Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Bell className="h-4 w-4 text-orange-500" /> Pending
                        </h3>
                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
                    </div>
                    {MOCK_ORDERS.filter(o => o.status === 'pending').map(order => (
                        <Card key={order.id} className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-all">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base">{order.id}</CardTitle>
                                    <span className="text-xs text-muted-foreground">{order.time}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm space-y-1 mb-3">
                                    {order.items.map((item, i) => <li key={i}>• {item}</li>)}
                                </ul>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{order.total}</span>
                                    <Button size="sm">Accept Details</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Preparing Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <ChefHat className="h-4 w-4 text-blue-500" /> Preparing
                        </h3>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
                    </div>
                    {MOCK_ORDERS.filter(o => o.status === 'preparing').map(order => (
                        <Card key={order.id} className="border-l-4 border-l-blue-500 shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base">{order.id}</CardTitle>
                                    <span className="text-xs text-muted-foreground">{order.time}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm space-y-1 mb-3">
                                    {order.items.map((item, i) => <li key={i}>• {item}</li>)}
                                </ul>
                                <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                    Food Ready →
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Ready Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> Ready
                        </h3>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
                    </div>
                    {MOCK_ORDERS.filter(o => o.status === 'ready').map(order => (
                        <Card key={order.id} className="border-l-4 border-l-green-500 opacity-75">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base">{order.id}</CardTitle>
                                    <span className="text-xs text-muted-foreground">Waiting for rider</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                    Rider Assigned
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
