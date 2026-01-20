"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// We'll trust these icons exist in lucide-react (standard set)
import {
    Home,
    ShoppingBag,
    Settings,
    User,
    Bike,
    Store,
    BarChart3,
    CreditCard,
    LogOut
} from "lucide-react"

interface SidebarProps {
    className?: string
    role?: "student" | "vendor" | "rider" | "admin"
}

export function Sidebar({ className, role = "student" }: SidebarProps) {
    const pathname = usePathname()

    const links = {
        student: [
            { href: "/", label: "Marketplace", icon: Home },
            { href: "/orders", label: "My Orders", icon: ShoppingBag },
            { href: "/profile", label: "Profile", icon: User },
        ],
        vendor: [
            { href: "/vendor", label: "Dashboard", icon: BarChart3 },
            { href: "/vendor/menu", label: "Menu", icon: Store },
            { href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
            { href: "/vendor/wallet", label: "Wallet", icon: CreditCard },
        ],
        rider: [
            { href: "/rider", label: "Job Center", icon: Bike },
            { href: "/rider/active", label: "Active Order", icon: ShoppingBag },
            { href: "/rider/wallet", label: "Earnings", icon: CreditCard },
            { href: "/rider/profile", label: "Profile", icon: User },
        ],
        admin: [
            { href: "/admin", label: "God Mode", icon: BarChart3 },
            { href: "/admin/users", label: "Users", icon: User },
            { href: "/admin/disputes", label: "Disputes", icon: Settings },
        ]
    }

    const currentLinks = links[role] || links.student

    return (
        <div className={cn("pb-12 min-h-screen w-64 border-r bg-background/60 backdrop-blur-xl border-white/20 fixed left-0 top-0 z-50 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
                        Leta App
                    </h2>
                    <div className="space-y-1">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                                    pathname === link.href
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-4 w-full px-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
