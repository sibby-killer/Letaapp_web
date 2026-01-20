"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, Wallet, Smartphone } from "lucide-react"

export default function VendorWallet() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-primary text-primary-foreground">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-80">Available Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">KES 12,450</div>
                        <p className="text-sm opacity-80 mt-1">Pending Clearance: KES 1,200</p>
                        <Button variant="secondary" className="mt-4 w-full gap-2 font-bold">
                            <Smartphone className="h-4 w-4" /> Withdraw to M-Pesa
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-muted-foreground">Total Earnings (This Month)</span>
                            <span className="font-bold text-green-600">KES 45,000</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-muted-foreground">Commission Paid (Platform)</span>
                            <span className="font-bold text-red-500">- KES 9,000</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-semibold mt-8">Recent Transactions</h2>
            <Card>
                <CardContent className="p-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${i === 2 ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                                    {i === 2 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-medium">{i === 2 ? 'M-Pesa Withdrawal' : 'Order Payment #ORD-88' + i}</p>
                                    <p className="text-xs text-muted-foreground">20 Jan 2026, 12:30 PM</p>
                                </div>
                            </div>
                            <div className={`font-bold ${i === 2 ? 'text-red-500' : 'text-green-600'}`}>
                                {i === 2 ? '- KES 5,000' : '+ KES 850'}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
