"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react"

// Mock Products
const products = [
    { id: 1, name: "Smocha Special", price: "KES 50", category: "Snacks", status: "Available", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=80" },
    { id: 2, name: "Chicken Biryani", price: "KES 400", category: "Main Dish", status: "Available", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80" },
    { id: 3, name: "Passion Juice", price: "KES 100", category: "Drinks", status: "Out of Stock", image: null },
]

export default function MenuPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Menu Manager</h1>
                    <p className="text-muted-foreground">Add, edit, and organize your products.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden group">
                        <div className="h-40 bg-muted flex items-center justify-center relative">
                            {product.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                            )}
                            <div className="absolute top-2 right-2">
                                <Badge variant={product.status === 'Available' ? 'default' : 'destructive'}>
                                    {product.status}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{product.name}</CardTitle>
                                <span className="font-bold text-primary">{product.price}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="w-full gap-2">
                                    <Edit className="h-4 w-4" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
