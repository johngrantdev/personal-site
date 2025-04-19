'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { Category, Keyword } from 'payload-types'

// The page context handles both page and post scenarios
// Settings states are optional covering both contexts
// eg. Pages and Posts share some common values such as title and description
// but category or keywords

// for use in Post Hero Side Column
export interface TOCItem {
  title: string
  url: string // the # to the location on the page
  type: string // eg. h1, h2 etc.
}

interface PageContextType {
  title: string
  description: string
  publishedAt: Date | null
  category: Category | null
  keywords: Keyword[]
  tableOfContents: TOCItem[]
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setPublishedAt: React.Dispatch<React.SetStateAction<Date | null>>
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>
  setKeywords: React.Dispatch<React.SetStateAction<Keyword[]>>
  setTableOfContents: React.Dispatch<React.SetStateAction<TOCItem[]>>
}

export const PageContext = createContext<PageContextType>({
  title: '',
  description: '',
  publishedAt: null,
  category: null,
  keywords: [],
  tableOfContents: [],
  setTitle: () => {},
  setDescription: () => {},
  setPublishedAt: () => {},
  setCategory: () => {},
  setKeywords: () => {},
  setTableOfContents: () => {},
})

type PageProviderProps = { children: React.ReactNode }
export const PageProvider: React.FC<React.PropsWithChildren<{
  title?: string
  description?: string
  publishedAt?: Date | null
  category?: Category | null
  keywords?: Keyword[]
  tableOfContents?: TOCItem[]
}>> = ({
  children,
  title = '',
  description = '',
  publishedAt = null,
  category = null,
  keywords = [],
  tableOfContents = [],
}) => {
  const [pageTitle, setTitle] = useState(title)
  const [pageDescription, setDescription] = useState(description)
  const [pagePublishedAt, setPublishedAt] = useState<Date | null>(publishedAt)
  const [pageCategory, setCategory] = useState<Category | null>(category)
  const [pageKeywords, setKeywords] = useState<Keyword[]>(keywords)
  const [pageTableOfContents, setTableOfContents] = useState<TOCItem[]>(tableOfContents)

  return (
    <PageContext.Provider
      value={{
        title: pageTitle,
        setTitle,
        description: pageDescription,
        setDescription,
        publishedAt: pagePublishedAt,
        setPublishedAt,
        category: pageCategory,
        setCategory,
        keywords: pageKeywords,
        setKeywords,
        tableOfContents: pageTableOfContents,
        setTableOfContents,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}


export const usePage = (): PageContextType => useContext(PageContext)

