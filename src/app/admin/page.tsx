'use client'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AdminPage() {
    return (
        <ProtectedRoute adminOnly>
            <div>Contenido exclusivo para administradores</div>
        </ProtectedRoute>
    )
}