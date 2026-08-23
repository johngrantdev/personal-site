import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import type { Page } from '@/payload/payload-types'

import { headingId } from '../../lib/content'

const headingClasses: Record<string, string> = {
  h1: 'text-6xl scroll-mt-24 mt-6 pb-6 last:pb-0',
  h2: 'text-5xl scroll-mt-24 pb-6 last:pb-0',
  h3: 'text-4xl scroll-mt-24 pb-6 last:pb-0',
  h4: 'text-3xl scroll-mt-24 pb-6 last:pb-0',
  h5: 'text-2xl scroll-mt-24 pb-6 last:pb-0',
  h6: 'text-xl scroll-mt-24 pb-6 last:pb-0',
}

export const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }: any) => {
    const Tag = node.tag as keyof React.JSX.IntrinsicElements
    if (!headingClasses[Tag]) return null
    const title = node.children?.map((child: { text?: string }) => child.text || '').join('') || ''
    return React.createElement(
      Tag,
      { id: headingId(title), className: headingClasses[Tag] },
      nodesToJSX({ nodes: node.children }),
    )
  },
  paragraph: ({ node, nodesToJSX }: any) =>
    node.children?.length ? (
      <p className="pb-6 last:pb-0">{nodesToJSX({ nodes: node.children })}</p>
    ) : null,
  quote: ({ node, nodesToJSX }: any) => (
    <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),
  list: ({ node, nodesToJSX }: any) =>
    node.tag === 'ul' ? (
      <div className="w-full flex justify-center xl:justify-start">
        <ul className="list-disc pl-5 pb-6 text-left">{nodesToJSX({ nodes: node.children })}</ul>
      </div>
    ) : node.tag === 'ol' ? (
      <ol>{nodesToJSX({ nodes: node.children })}</ol>
    ) : null,
  link: ({ node, nodesToJSX }: any) => {
    const page = typeof node.fields.doc?.value === 'object' ? (node.fields.doc.value as Page) : null
    const href = node.fields.linkType === 'internal' ? `/${page?.slug || ''}` : node.fields.url
    return (
      <a
        className="underline underline-offset-[6px]"
        href={href}
        target={node.fields.newTab ? '_blank' : undefined}
        rel={node.fields.newTab ? 'noopener noreferrer' : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    )
  },
})
