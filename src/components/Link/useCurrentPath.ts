'use client'
  
import { usePathname } from 'next/navigation'

/**
 * Returns the current pathname, always starting with '/'.
 */
export function useCurrentPath() {
  let pathname = usePathname()
  // Ensure trailing slash consistency
  if (pathname && pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }
  return pathname
}
