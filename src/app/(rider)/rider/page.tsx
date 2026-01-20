import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RiderHome() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Rider Portal</h1>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full h-24 text-xl" variant="default">Go Online</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Today&apos;s Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">KES 2,500</p>
                </CardContent>
            </Card>
        </div>
    )
}
