'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect } from 'react'
import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import admin from '@/../public/admin.png';
import dashboard from '@/../public/dashboard.png';


export default function AdminSelectionPage() {
  const router = useRouter()

  useEffect(() => {
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    if (!isSuperuser) {
      router.push('/dashboard');
    }
  }, [router])

  const handleSelection = (isAdminPanel: boolean) => {
    if (isAdminPanel) {
      window.location.href = 'http://192.168.1.74:8000/admin/'; 
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-slate-200 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-center mb-6">Panel de Administración</h1>
          <ThemeToggle />
        </div>
        
        <div className="space-y-4">
          <div 
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700" 
            onClick={() => handleSelection(true)}
          >
            <h2 className="font-semibold text-center mb-2">Panel de Administración</h2>
            <Image src={admin} alt="" />
          </div>
          
          <div 
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700"
            onClick={() => handleSelection(false)}
          >
            <h2 className="font-semibold text-center mb-2">Dashboard de Usuario</h2>
            <Image src={dashboard} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}