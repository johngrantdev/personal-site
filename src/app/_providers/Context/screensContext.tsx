'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../../../tailwind.config'

const tailwindScreens = resolveConfig(tailwindConfig).theme.screens

const convertScreensToNumbers = screens => {
  const result = {}
  Object.keys(screens).forEach(key => {
    result[key] = parseInt(screens[key], 10)
  })
  return result
}

const tailwindBreakpoints = convertScreensToNumbers(tailwindScreens)

interface ScreenType {
  size: number
  currentBreakpoint: string
  breakpoints: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
}

interface ScreenContextType {
  screen: ScreenType
  setScreen: React.Dispatch<React.SetStateAction<ScreenType>>
}

const ScreenContext = createContext<ScreenContextType>({
  screen: { size: 0, currentBreakpoint: 'xs', breakpoints: tailwindBreakpoints }, // default values
  setScreen: () => {},
})

interface ScreenProviderProps {
  children: React.ReactNode
}

export const ScreenProvider: React.FC<ScreenProviderProps> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenType>({
    size: 0, // default size
    currentBreakpoint: 'xs', // default breakpoint
    breakpoints: { ...convertScreensToNumbers(tailwindScreens) },
  })

  useEffect(() => {
    // This function now only runs on the client
    const updateScreenSize = () => {
      const width = window.innerWidth
      let currentBreakpoint = 'xs'

      Object.keys(screen.breakpoints).forEach(key => {
        if (width >= screen.breakpoints[key]) {
          currentBreakpoint = key
        }
      })

      setScreen(prev => ({ ...prev, size: width, currentBreakpoint }))
    }

    updateScreenSize() // Set initial size
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, []) // Empty dependency array to run only once on mount

  return <ScreenContext.Provider value={{ screen, setScreen }}>{children}</ScreenContext.Provider>
}

export const useScreen = () => useContext(ScreenContext)

export default ScreenContext
