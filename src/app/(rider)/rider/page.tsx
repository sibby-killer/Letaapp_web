"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SlideButton } from "@/components/ui/slide-button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, MessageCircle, DollarSign, Clock } from "lucide-react"
import dynamic from 'next/dynamic'

const OSMMap = dynamic(() => import('@/components/maps/osm-map'), { ssr: false })

export default function RiderHome() {
    const [isOnline, setIsOnline] = useState(false)
    const [jobOffer, setJobOffer] = useState<any>(null) // Simulated job offer
    const [activeOrder, setActiveOrder] = useState<any>(null) // Accepted order

    // Simulate receiving a job offer when online
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isOnline && !activeOrder && !jobOffer) {
            timer = setTimeout(() => {
                setJobOffer({
                    id: "ORD-999",
                    restaurant: "Mama Oliech's",
                    distance: "2.5 km",
                    earnings: "KES 120",
                    countdown: 90
                })
            }, 3000) // 3 seconds after going online
        }
        return () => clearTimeout(timer)
    }, [isOnline, activeOrder, jobOffer])

    const acceptJob = () => {
        setActiveOrder(jobOffer)
        setJobOffer(null)
    }

    const rejectJob = () => {
        setJobOffer(null)
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Top Bar */}
            <div className="flex justify-between items-center bg-card p-4 rounded-xl shadow-sm border">
                <div>
                    <h1 className="text-2xl font-bold">Rider Portal</h1>
                    <p className="text-sm text-muted-foreground">{isOnline ? "🟢 You are Online" : "⚫ You are Offline"}</p>
                </div>
                <Button
                    size="lg"
                    variant={isOnline ? "destructive" : "default"}
                    onClick={() => setIsOnline(!isOnline)}
                    className="w-32"
                >
                    {isOnline ? "Go Offline" : "Go Online"}
                </Button>
            </div>

            {/* Stats Grid */}
            {!activeOrder && (
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Today's Earnings</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">KES 850</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Activity Score</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold text-green-600">98%</div></CardContent>
                    </Card>
                </div>
            )}

            {/* JOB OFFER MODAL (Simulated) */}
            {jobOffer && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
                    <Card className="w-full max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-300 border-2 border-primary shadow-2xl">
                        <CardHeader className="text-center pb-2">
                            <Badge className="mx-auto mb-2">New Order Request</Badge>
                            <CardTitle className="text-3xl font-extrabold text-primary">{jobOffer.earnings}</CardTitle>
                            <p className="text-muted-foreground">{jobOffer.distance} • Pick up from {jobOffer.restaurant}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[80%]" /> {/* Static progress for demo */}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" size="lg" onClick={rejectJob}>Reject</Button>
                                <Button size="lg" onClick={acceptJob} className="bg-green-600 hover:bg-green-700 text-white">Accept (85s)</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* ACTIVE ORDER VIEW */}
            {activeOrder && (
                <div className="space-y-4">
                    <Card className="overflow-hidden border-primary/20">
                        <div className="h-[250px] relative">
                            <OSMMap className="h-full w-full" />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{activeOrder.restaurant}</h4>
                                    <p className="text-xs text-muted-foreground">Pick up order #123</p>
                                </div>
                                <Button size="icon" variant="secondary"><Navigation className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <CardContent className="pt-4 space-y-4">

                            {/* Customer Info */}
                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="font-bold text-primary">JD</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">John Doe</p>
                                        <p className="text-xs text-muted-foreground">Student • Hostel 4</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost"><MessageCircle className="h-4 w-4" /></Button>
                                    <Button size="icon" variant="ghost"><Phone className="h-4 w-4" /></Button>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Order Items</h4>
                                <div className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span>2x Smocha Special</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span>1x Soda</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3 pt-2">
                                <SlideButton text="Slide to Pick Up" onComplete={() => alert("Picked up! Now heading to student.")} />
                                <Button variant="ghost" className="w-full text-red-500 text-xs" onClick={() => setActiveOrder(null)}>Cancel Order (Debug)</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
