"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Smartphone } from "lucide-react"

export default function RiderWallet() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>

            <Card className="bg-neutral-900 text-white dark:bg-card">
                <CardContent className="p-6 text-center space-y-4">
                    <p className="text-sm opacity-70">Current Balance</p>
                    <div className="text-5xl font-extrabold tracking-tighter text-emerald-400">KES 2,850</div>
                    <Button className="w-full max-w-sm bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 text-lg gap-2">
                        <Smartphone className="h-5 w-5" /> Cash Out to M-Pesa
                    </Button>
                    <p className="text-xs text-muted-foreground opacity-60">Wait time: Instant (via Paystack)</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Today</CardTitle></CardHeader>
                    <CardContent><div className="text-xl font-bold">KES 850</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">This Week</CardTitle></CardHeader>
                    <CardContent><div className="text-xl font-bold">KES 8,500</div></CardContent>
                </Card>
            </div>

            <h3 className="font-semibold text-lg mt-4">Trip History</h3>
            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="hover:bg-muted/50">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Delivery to Hostel {i}</p>
                                <p className="text-xs text-muted-foreground">2.5 km • 15 mins</p>
                            </div>
                            <span className="font-bold text-emerald-600">+ KES 150</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
