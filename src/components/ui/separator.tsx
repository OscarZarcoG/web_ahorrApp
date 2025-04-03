'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical'
  }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'shrink-0 bg-gray-200 dark:bg-gray-800',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    role="separator"
    {...props}
  />
))

Separator.displayName = 'Separator'

export { Separator }