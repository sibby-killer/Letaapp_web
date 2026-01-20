import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentHome() {
    return (
        <div className="container mx-auto p-4">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">Leta Food</h1>
                <Button>Cart (0)</Button>
            </header>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Find your favorite food here.</p>
                        <div className="mt-4">
                            {/* Search bar placeholder */}
                            <Button variant="outline">Search Restaurants</Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
