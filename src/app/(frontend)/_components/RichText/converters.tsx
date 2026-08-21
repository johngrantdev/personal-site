import React from 'react'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

import { Blocks } from '../Blocks'
import { CMSLink } from '../Link'
import { Media } from '../Media'

export const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }: any) => {
    const id = (node.children?.[0]?.text ?? '').replace(/\s+/g, '-').toLowerCase()
    let className = 'scroll-mt-24 pb-6 last:pb-0'

    switch (node.tag) {
      case 'h1':
        className = 'text-6xl scroll-mt-24 mt-6 pb-6 last:pb-0'
        return (
          <h1 id={id} className={className}>
            {nodesToJSX({ nodes: node.children })}
          </h1>
        )
      case 'h2':
        className = 'text-5xl scroll-mt-24 pb-6 last:pb-0'
        return (
          <h2 id={id} className={className}>
            {nodesToJSX({ nodes: node.children })}
          </h2>
        )
      case 'h3':
        className = 'text-4xl scroll-mt-24 pb-6 last:pb-0'
        return (
          <h3 id={id} className={className}>
            {nodesToJSX({ nodes: node.children })}
          </h3>
        )
      case 'h4':
        className = 'text-3xl scroll-mt-24 pb-6 last:pb-0'
        return (
          <h4 id={id} className={className}>
            {nodesToJSX({ nodes: node.children })}
          </h4>
        )
      case 'h5':
        className = 'text-2xl scroll-mt-24 pb-6 last:pb-0'
        return (
          <h5 id={id} className={className}>
            {nodesToJSX({ nodes: node.children })}
          </h5>
        )
      case 'h6':
        className = 'text-xl scroll-mt-24 pb-6 last:pb-0'
        return (
          <h6 id={id} className={className}>
            {nodesToJSX({ nodes: node.children })}
          </h6>
        )
      default:
        return null
    }
  },
  paragraph: ({ node, nodesToJSX }: any) => {
    if (!node.children || node.children.length === 0) {
      return null
    }

    return (
      <p className="pb-6 last:pb-0">
        {nodesToJSX({ nodes: node.children })}
      </p>
    )
  },
  quote: ({ node, nodesToJSX }: any) => (
    <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),
  list: ({ node, nodesToJSX }: any) => {
    if (node.tag === 'ul') {
      return (
        <div className="w-full flex justify-center xl:justify-start">
          <ul className="list-disc pl-5 pb-6 text-left">
            {nodesToJSX({ nodes: node.children })}
          </ul>
        </div>
      )
    }

    if (node.tag === 'ol') {
      return <ol>{nodesToJSX({ nodes: node.children })}</ol>
    }

    return null
  },
  link: ({ node, nodesToJSX }: any) => (
    <CMSLink
      className="underline underline-offset-[6px]"
      type={node.fields.linkType === 'internal' ? 'reference' : 'custom'}
      url={node.fields.url}
      reference={node.fields.doc}
      newTab={Boolean(node.fields.newTab)}
      label=""
    >
      {nodesToJSX({ nodes: node.children })}
    </CMSLink>
  ),
  upload: ({ node }: any) => (
    <Media
      className="w-full h-full"
      imgClassName="h-full w-full object-cover rounded-md relative"
      resource={node.value}
    />
  ),
  blocks: {
    cta: ({ node }: any) => (
      <div className="pb-6 last:pb-0">
        <Blocks blocks={[node.fields]} />
      </div>
    ),
    code: ({ node }: any) => (
      <div className="pb-6 last:pb-0">
        <Blocks blocks={[node.fields]} />
      </div>
    ),
    mediaBlock: ({ node }: any) => (
      <div className="pb-6 last:pb-0">
        <Blocks blocks={[node.fields]} />
      </div>
    ),
    vimeoBlock: ({ node }: any) => (
      <div className="pb-6 last:pb-0">
        <Blocks blocks={[node.fields]} />
      </div>
    ),
  },
})
