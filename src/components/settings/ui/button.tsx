'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
}>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Variantes
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',
        variant === 'outline' && 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
        variant === 'ghost' && 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
        variant === 'link' && 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400',
        // Tamaños
        size === 'default' && 'h-10 py-2 px-4',
        size === 'sm' && 'h-9 px-3 rounded-md',
        size === 'lg' && 'h-11 px-8 rounded-md',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button }