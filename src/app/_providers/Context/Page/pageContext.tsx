'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { Category, Keyword } from '../../../../payload/payload-types'

// The page context handles both page and post scenarios
// Settings states are optional covering both contexts
// eg. Pages and Posts share some common values such as title and description
// but not categories or keywords
interface PageContextType {
  title: string
  description: string
  category: Category
  keywords: Keyword[]
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setCategory: React.Dispatch<React.SetStateAction<Category>>
  setKeywords: React.Dispatch<React.SetStateAction<Keyword[]>>
}

export const PageContext = createContext<PageContextType>({
  title: '',
  description: '',
  category: null,
  keywords: [],
  setTitle: () => {},
  setDescription: () => {},
  setCategory: () => {},
  setKeywords: () => {},
})

export const PageProvider = ({ children }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [keywords, setKeywords] = useState<Keyword[]>([])

  return (
    <PageContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        keywords,
        setKeywords,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const usePage = () => useContext(PageContext)

export const PageState: React.FC<{
  title?: string
  description?: string
  category?: Category | null
  keywords?: Keyword[]
}> = ({ title = '', description = '', category = null, keywords = null }) => {
  const { setTitle, setDescription, setCategory, setKeywords } = usePage()

  useEffect(() => {
    setTitle(title)
    setDescription(description)
    setCategory(category)
    setKeywords(keywords)
  }, [title, setTitle, description, setDescription, category, setCategory, keywords, setKeywords])

  return null
}
