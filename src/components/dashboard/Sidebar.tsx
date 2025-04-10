'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

export const Sidebar = ({ isOpen, onClose, onLogout }: SidebarProps) => {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: '🏠', label: 'Inicio' },
    { href: '/transactions', icon: '💸', label: 'Transacciones' },
    { href: '/settings', icon: '⚙️', label: 'Configuración' },
  ]

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 bg-white dark:bg-gray-800 shadow-md z-30 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">AhorrApp</h2>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg ${pathname === item.href ? 'bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={onClose}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <span className="mr-3">🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}