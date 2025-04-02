'use client'
import { useState } from 'react'
import { useAuth } from '@/hook/useAuth'

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          👤
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-30">
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
            >
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}