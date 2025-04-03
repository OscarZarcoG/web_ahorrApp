'use client'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export const Settings = () => {
  const { theme, setTheme } = useTheme()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('es')

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personaliza tu experiencia en la plataforma
        </p>
      </div>

      <Separator />

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
      </div>

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
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
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

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="analytics">Compartir datos analíticos</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ayúdanos a mejorar la plataforma
            </p>
          </div>
          <Switch
            id="analytics"
            checked={analyticsEnabled}
            onCheckedChange={setAnalyticsEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cuenta</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Cambiar contraseña
          </Button>
          <Button variant="destructive" className="w-full">
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