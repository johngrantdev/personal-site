export type RichTextData = {
  root?: {
    children?: LexicalNode[]
    [key: string]: unknown
  }
  [key: string]: unknown
}

export type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
  fields?: Record<string, unknown>
  value?: unknown
  [key: string]: unknown
}

export type TOCItem = { title: string; url: string; type: string }

export const headingId = (text: string): string => text.replace(/\s+/g, '-').toLowerCase()

const nodeText = (node: LexicalNode): string =>
  node.text || node.children?.map(nodeText).join('') || ''

export const extractTOC = (content: RichTextData | null | undefined): TOCItem[] => {
  const items: TOCItem[] = []

  const walk = (nodes: LexicalNode[] = []) => {
    for (const node of nodes) {
      if (node.type === 'heading') {
        const title = nodeText(node)
        if (title) items.push({ title, url: `#${headingId(title)}`, type: node.tag || 'h2' })
      }
      if (node.children) walk(node.children)
    }
  }

  walk(content?.root?.children)
  return items
}

export const richTextChunk = (content: RichTextData, children: LexicalNode[]): RichTextData => ({
  ...content,
  root: { ...content.root, children },
})

export const toKebabCase = (value?: string | null): string | undefined =>
  value?.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()

export const formatDate = (value?: string | null): string =>
  value
    ? new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(value))
    : ''
