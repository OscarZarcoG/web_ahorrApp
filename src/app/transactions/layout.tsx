'use client'
import { useState } from 'react'
import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import { Sidebar } from '@/components/dashboard/Sidebar';
import { useAuth } from '@/hook/useAuth';
import { UserDropdown } from '@/components/dashboard/UserDropdown';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { logout } = useAuth()

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onLogout={logout}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
                        <div className="flex items-center justify-between px-4 py-3 w-full">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="md:hidden text-gray-500 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                <ThemeToggle />
                                <UserDropdown />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}