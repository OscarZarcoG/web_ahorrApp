'use client'
import Link from 'next/link'

export const RouteSelector = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Bienvenido a tu Dashboard
        </h1>
        
        <div className="space-y-6">
          <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Benemer</h2>
            <p className="text-gray-600 dark:text-gray-300">Validación académica masculina</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link 
              href="/admin" 
              className="p-6 bg-green-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Panel de Administración</h3>
              <p className="text-gray-600 dark:text-gray-300">Acceso completo al sistema</p>
            </Link>
            
            <Link 
              href="/dashboard" 
              className="p-6 bg-purple-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dashboard Usuario</h3>
              <p className="text-gray-600 dark:text-gray-300">Acceso estándar</p>
            </Link>
          </div>
          
          <div className="p-6 bg-yellow-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notificaciones</h3>
            <p className="text-gray-600 dark:text-gray-300">Homa de contractivo mágico</p>
          </div>
        </div>
      </div>
    </div>
  )
}