'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface Props {
  className?: string
}

export const ThemeSelector = (props: Props) => {
  const { className = '' } = props
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <div
      className={`${className} cursor-pointer hover:underline hover:underline-offset-4 select-none`}
      onClick={toggleTheme}
    >
      {`Change to ${theme === 'light' ? 'dark mode' : 'light mode'}`}
    </div>
  )
}
