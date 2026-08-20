import React, { createContext, ReactNode, useEffect, useState } from 'react'

// Define the shape of the context data
interface MousePosition {
  x: number
  y: number
}

// Create the context with a default value
const MouseContext = createContext<MousePosition>({ x: 0, y: 0 })

interface MouseProviderProps {
  children: ReactNode
}

export const MouseProvider: React.FC<MouseProviderProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', updatePosition)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [])

  return <MouseContext.Provider value={mousePosition}>{children}</MouseContext.Provider>
}

export default MouseContext
