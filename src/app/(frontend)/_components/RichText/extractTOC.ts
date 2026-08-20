import { TOCItem } from '../../_providers/Context/pageContext'

export const extractTOC = (content: any): TOCItem[] => {
  if (!content || !content.root) {
    return []
  }

  const toc: TOCItem[] = []

  const walkNodes = (nodes: any[] = []): void => {
    nodes.forEach((node) => {
      if (!node) {
        return
      }

      if (node.type === 'heading') {
        const text = node.children?.[0]?.text ?? ''
        if (text) {
          const slug = text.replace(/\s+/g, '-').toLowerCase()
          toc.push({
            title: text,
            url: `#${slug}`,
            type: node.tag,
          })
        }
      }

      if (node.children && Array.isArray(node.children)) {
        walkNodes(node.children)
      }
    })
  }

  walkNodes(content.root.children)
  return toc
}
