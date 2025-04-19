"use client"
import React, { useEffect } from "react"
import { usePage } from "@/providers/Context/pageContext"
import RichText from "./index"

// Type for a Table of Contents item
export type TOCItem = {
  id: string
  text: string
  level: number
}

// Utility to extract TOC items from Lexical editor state
function extractTOCFromLexical(editorState: any): TOCItem[] {
  const toc: TOCItem[] = []
  if (!editorState?.root?.children) return toc

  function walk(nodes: any[]) {
    for (const node of nodes) {
      // Lexical headings typically have type like 'heading'
      if (node.type && node.type.startsWith("heading")) {
        toc.push({
          id: node.key || node.id || node.text || Math.random().toString(36).slice(2),
          text: node.children?.[0]?.text || "",
          level: Number(node.tag?.replace("h", "")) || 1,
        })
      }
      if (node.children) walk(node.children)
    }
  }

  walk(editorState.root.children)
  return toc
}

type Props = React.ComponentProps<typeof RichText> & {
  data: any // Lexical editor state
}

const RichTextWithTOC: React.FC<Props> = ({ data, ...rest }) => {
  const { setTableOfContents } = usePage()

  useEffect(() => {
    const toc = extractTOCFromLexical(data)
    setTableOfContents(toc)
  }, [data, setTableOfContents])

  return <RichText data={data} {...rest} />
}

export default RichTextWithTOC
