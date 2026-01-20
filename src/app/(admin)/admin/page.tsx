import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-red-600">Admin God Mode</h1>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>System Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Total Users: 1,234</p>
                        <p>Total Orders: 5,678</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
