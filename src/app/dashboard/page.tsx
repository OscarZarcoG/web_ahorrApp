'use client'
import { Card } from '@/components/dashboard/Card'
import api from "@/api/conectionBack.js";
import { useEffect, useState } from 'react'
import { Mini_alert } from '@/components/alerts/Mini-alert'

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await api.get(`api/user/details/${userId}/`);
        setUserName(response.data.first_name || 'Usuario');
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudo cargar el nombre de usuario');
        setUserName('Usuario');
      } finally {
        setLoading(false);
      }
  
      setTimeout(() => {
        setError(null);
      }, 2000);
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="space-y-6">
      <div className='flex flex-row'>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {loading ? 'Cargando...' : `Bienvenido ${userName}`}
        </h1>

        {error && ( 
          <Mini_alert type="error" message={error} />
        )}
      </div>
      
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