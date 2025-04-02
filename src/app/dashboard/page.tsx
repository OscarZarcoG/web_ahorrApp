'use client'
import { Card } from '@/components/dashboard/Card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bienvenido a tu Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Resumen" 
          icon="📊"
          content="Visualiza tus estadísticas principales"
        />
        <Card 
          title="Actividad Reciente" 
          icon="🔄"
          content="Revisa tus últimas acciones"
        />
        <Card 
          title="Notificaciones" 
          icon="🔔"
          content="Tienes 3 notificaciones nuevas"
        />
      </div>
    </div>
  )
}