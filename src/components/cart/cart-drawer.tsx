"use client"

import { useCartStore } from "@/lib/store/cart-store"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet" // Need to ensure Sheet exists or build simple sidebar
import { ShoppingBag, X, Plus, Minus, Smartphone } from "lucide-react"

export function CartDrawer() {
    const { items, isOpen, toggleCart, updateQuantity, total } = useCartStore()

    // Simple Drawer (Fixed Sidebar if Sheet doesn't exist yet, but let's assume standard UI pattern)
    // Actually, let's build a custom toggleable overlay to avoid missing component issues

    if (!isOpen) {
        return (
            <Button
                onClick={toggleCart}
                size="icon"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 z-50 animate-bounce"
            >
                <ShoppingBag className="h-6 w-6" />
                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {items.length}
                    </span>
                )}
            </Button>
        )
    }

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={toggleCart} />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl p-6 flex flex-col transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingBag className="h-6 w-6" /> Your Cart
                    </h2>
                    <Button variant="ghost" size="icon" onClick={toggleCart}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">
                            <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <p>Your cart is empty.</p>
                            <p className="text-sm">Start ordering some delicious food!</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">KES {item.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, -1)}>
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-4 text-center font-bold">{item.quantity}</span>
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, 1)}>
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t pt-4 mt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span>KES {total()}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg gap-2" disabled={items.length === 0}>
                        <Smartphone className="h-5 w-5" /> Pay with M-Pesa
                    </Button>
                </div>
            </div>
        </>
    )
}
