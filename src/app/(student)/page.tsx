"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from 'next/dynamic'
import { MapPin, Search, Star, Clock, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCartStore } from "@/lib/store/cart-store"

// Dynamically import Map to avoid SSR issues with Leaflet
const OSMMap = dynamic(() => import('@/components/maps/osm-map'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
})

// Mock Data for Stores
const MOCK_STORES = [
    { id: 1, name: "Mama Oliech's", rating: 4.8, time: "15-20 min", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", cuisine: "Swahili Dishes" },
    { id: 2, name: "Campus Fries", rating: 4.2, time: "10-15 min", image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?w=800&q=80", cuisine: "Fast Food" },
    { id: 3, name: "Smocha Central", rating: 4.9, time: "5-10 min", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80", cuisine: "Street Food" },
    { id: 4, name: "Java House (MMUST)", rating: 4.5, time: "25-30 min", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", cuisine: "Coffee & Snacks" },
]

export default function StudentHome() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Leta Food</h1>
                    <p className="text-muted-foreground">Order from your favorite campus spots.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search food..." className="pl-9" />
                    </div>
                    <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Map Section */}
            <section className="relative group">
                <div className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium shadow-sm border">
                    📍 Identifying Location...
                </div>
                <OSMMap className="h-[250px] md:h-[300px] w-full rounded-xl border shadow-sm" />
            </section>

            {/* Stores Grid */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Popular Near You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_STORES.map((store) => (
                        <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                            <div className="h-40 w-full overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-bold shadow flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-red-500" /> {store.time}
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-lg">{store.name}</h3>
                                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold">
                                        <Star className="w-3 h-3 fill-current" /> {store.rating}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{store.cuisine}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-xs text-primary flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> Free Delivery
                                    </p>
                                    <AddToCartButton store={store} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <CartDrawer />
        </div>
    )
}

function AddToCartButton({ store }: { store: any }) {
    const addItem = useCartStore(state => state.addItem)
    const toggleCart = useCartStore(state => state.toggleCart)

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent card click
        addItem({
            id: crypto.randomUUID(), // Unique ID for this instance
            name: "Sample Meal from " + store.name,
            price: 250,
            quantity: 1,
            restaurantId: String(store.id)
        })
        toggleCart() // Open cart immediately
    }

    return (
        <Button size="sm" className="h-7 text-xs gap-1" onClick={handleAdd}>
            <Plus className="h-3 w-3" /> Add
        </Button>
    )
}
