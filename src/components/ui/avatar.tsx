'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, size = 'md', ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full',
      size === 'sm' && 'h-8 w-8',
      size === 'md' && 'h-10 w-10',
      size === 'lg' && 'h-12 w-12',
      className
    )}
    {...props}
  />
))

Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))

AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800',
      className
    )}
    {...props}
  />
))

AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }