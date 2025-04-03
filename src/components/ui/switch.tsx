'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        'inline-flex h-6 w-11 items-center rounded-full transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
      ref={ref}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg',
          'transform transition-transform',
          checked ? 'translate-x-6' : 'translate-x-0'
        )}
      />
    </button>
  )
})

Switch.displayName = 'Switch'

export { Switch }