'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '../_providers/Auth'
import { TitleProvider } from './Context/Title/titleContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <TitleProvider>{children}</TitleProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
