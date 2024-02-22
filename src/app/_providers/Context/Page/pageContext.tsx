'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { Category, Keyword } from '../../../../payload/payload-types'

// The page context handles both page and post scenarios
// Settings states are optional covering both contexts
// eg. Pages and Posts share some common values such as title and description
// but category or keywords
interface PageContextType {
  title: string
  description: string
  publishedAt: Date
  category: Category
  keywords: Keyword[]
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setPublishedAt: React.Dispatch<React.SetStateAction<Date>>
  setCategory: React.Dispatch<React.SetStateAction<Category>>
  setKeywords: React.Dispatch<React.SetStateAction<Keyword[]>>
}

export const PageContext = createContext<PageContextType>({
  title: '',
  description: '',
  publishedAt: undefined,
  category: undefined,
  keywords: [],
  setTitle: () => {},
  setDescription: () => {},
  setPublishedAt: () => {},
  setCategory: () => {},
  setKeywords: () => {},
})

export const PageProvider = ({ children }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [publishedAt, setPublishedAt] = useState<Date>(undefined)
  const [category, setCategory] = useState<Category | null>(undefined)
  const [keywords, setKeywords] = useState<Keyword[]>([])

  return (
    <PageContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        publishedAt,
        setPublishedAt,
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
  publishedAt?: string
  category?: Category | null
  keywords?: Keyword[]
}> = ({
  title = '',
  description = '',
  publishedAt = undefined,
  category = undefined,
  keywords = undefined,
}) => {
  const { setTitle, setDescription, setPublishedAt, setCategory, setKeywords } = usePage()

  useEffect(() => {
    setTitle(title)
    setDescription(description)
    if (publishedAt) {
      try {
        setPublishedAt(new Date(publishedAt))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`publishedAt is not a date string: ${error}`)
      }
    }
    setCategory(category)
    setKeywords(keywords)
  }, [
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    keywords,
    setKeywords,
    publishedAt,
    setPublishedAt,
  ])

  return null
}
