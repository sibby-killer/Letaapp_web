import { Sidebar } from "@/components/layout/sidebar";

export default function MainLayout({
    children,
    role = "student", // In real app, fetch from auth/db
}: {
    children: React.ReactNode;
    role?: "student" | "vendor" | "rider" | "admin";
}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role={role} />
            <main className="md:pl-64 min-h-screen transition-all">
                <div className="container mx-auto p-4 md:p-8 pt-16 md:pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
