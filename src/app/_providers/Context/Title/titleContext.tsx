'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface TitleContextType {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

export const TitleContext = createContext<TitleContextType>({
  title: '',
  setTitle: () => {},
})

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState('')

  return <TitleContext.Provider value={{ title, setTitle }}>{children}</TitleContext.Provider>
}

export const useTitle = () => useContext(TitleContext)

export const TitleState = ({ title = '' }) => {
  const { setTitle } = useTitle()

  useEffect(() => {
    setTitle(title)
  }, [title, setTitle])

  return null
}
