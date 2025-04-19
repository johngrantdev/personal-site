'use client'

import { PageContext } from "@/providers/Context/pageContext"
import { useContext, useEffect } from "react"

export interface TOCItem {
    title: string
    url: string // the # to the location on the page
    type: string // eg. h1, h2 etc.
  }
  
interface PageContextProps {
  title: string
  description: string
  publishedAt: Date | null
}

const PageContextSetter = ({
  title,
  description,
  publishedAt,
}: PageContextProps) => {
  const { setTitle, setDescription, setPublishedAt } = useContext(PageContext)

  useEffect(() => {
    setTitle(title)
    setDescription(description)
    setPublishedAt(publishedAt)
  }, [title, description, publishedAt])
  
  return null
}

export default PageContextSetter