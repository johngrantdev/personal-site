"use client"
import React, { useEffect, useState } from "react"
import { animated, useSpring } from "@react-spring/web"
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
  id?: string
  data: any // Lexical editor state
}

const RichTextWithTOCAndAnimation: React.FC<Props> = ({ id = "0", data, ...rest }) => {
  const [load, setLoad] = useState(false)
  const { setTableOfContents } = usePage()

  useEffect(() => {
    setLoad(true)
    const toc = extractTOCFromLexical(data)
    setTableOfContents(toc)
  }, [data, setTableOfContents])

  const fade = useSpring({
    opacity: load ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 280, friction: 60 },
  })

  return (
    <animated.div key={id} style={fade} className={rest.className}>
      <RichText data={data} {...rest} />
    </animated.div>
  )
}

export default RichTextWithTOCAndAnimation
