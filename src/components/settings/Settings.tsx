'use client'
import { useState } from 'react'
import { Switch } from '@/components/settings/ui/switch'
import { Label } from '@/components/settings/ui/label'
import { Button } from '@/components/settings/ui/button'
import { Separator } from '@/components/settings/ui/separator'
import {useTheme} from '@/context/ThemeContext'

interface SettingsProps {
  onLogout: () => void
}

export const Settings = ({ onLogout }: SettingsProps)=> {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personaliza tu experiencia en la plataforma
        </p>
      </div>

{/* 
      import { Avatar, AvatarImage } from '@/components/settings/ui/avatar'

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Perfil</h2>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/vercel.png" />
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">Usuario</p>
            <Button variant="outline" size="sm">
              Cambiar foto
            </Button>
          </div>
        </div>
      </div> */}

      <Separator />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Preferencias</h2>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="theme-mode">Modo oscuro</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Activa el tema oscuro para una mejor experiencia nocturna
            </p>
          </div>
          <Switch
            id="theme-mode"
            checked={theme === 'dark'}
            onCheckedChange={() => toggleTheme()} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="notifications">Notificaciones</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recibe alertas sobre actividades importantes
            </p>
          </div>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>

      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cuenta</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Cambiar contraseña
          </Button>
          <Button variant="destructive" className="w-full" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar cambios</Button>
      </div>
    </div>
  )
}