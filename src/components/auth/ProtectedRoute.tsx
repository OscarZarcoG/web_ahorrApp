'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const ProtectedRoute = ({ adminOnly = false, children }: {
    adminOnly?: boolean,
    children: React.ReactNode
}) => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isSuperuser = localStorage.getItem('is_superuser') === 'true';

        if (!token) {
            router.push('/login');
        } else if (adminOnly && !isSuperuser) {
            router.push('/dashboard');
        }
    }, [router, adminOnly])

    return <>{children}</>
}