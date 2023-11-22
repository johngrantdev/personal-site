'use client'
import { useTheme } from 'next-themes'

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <div
      className="cursor-pointer hover:underline hover:underline-offset-4 select-none"
      onClick={toggleTheme}
    >
      {`Change to ${theme === 'light' ? 'dark mode' : 'light mode'}`}
    </div>
  )
}
