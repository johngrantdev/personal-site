/* eslint-disable import/no-cycle */
import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'

import { Blocks } from '../Blocks'
import { CMSLink } from '../Link'
import { Media } from '../Media'

/*
the text formats are stored as a bitwise value eg.
Bold           0000001 -> 1
Italic         0000010 -> 2
Strikethrough  0000100 -> 4
Underline      0001000 -> 8
Code           0010000 -> 16
Subscript      0100000 -> 32
Superscript    1000000 -> 64
*/

const BOLD_MASK = 1
const ITALIC_MASK = 2
const STRIKETHROUGH_MASK = 4
const UNDERLINE_MASK = 8
const CODE_MASK = 16
const SUBSCRIPT_MASK = 32
const SUPERSCRIPT_MASK = 64

function getTextFormats(formatNumber) {
  const bold = (formatNumber & BOLD_MASK) !== 0
  const italic = (formatNumber & ITALIC_MASK) !== 0
  const strikethrough = (formatNumber & STRIKETHROUGH_MASK) !== 0
  const underline = (formatNumber & UNDERLINE_MASK) !== 0
  const code = (formatNumber & CODE_MASK) !== 0
  const subscript = (formatNumber & SUBSCRIPT_MASK) !== 0
  const superscript = (formatNumber & SUPERSCRIPT_MASK) !== 0

  return { bold, italic, strikethrough, underline, code, subscript, superscript }
}

const serialize = (nodes?: any[], i = 1): React.ReactNode => {
  return nodes.map((node, i) => {
    if (!node) {
      return null
    }
    // text styles
    const paddingTop = ' pt-3'
    // set alignment styles
    let textAlignment = ''
    if (typeof node.format === 'string') {
      switch (node.format) {
        case 'center':
          textAlignment = ' text-center'
          break
        case 'right':
          textAlignment = ' text-right'
          break
      }
    }
    // keep the below comment for tailwind parser
    // indent-6 indent-12 indent-18 indent-24 indent-30 indent-36 indent-42 indent-48
    let textIndent = ''
    if (node.indent) {
      textIndent = ` indent-${node.indent * 6}`
    }
    const textStyles = `${paddingTop}${textAlignment}${textIndent}`

    switch (node.type) {
      case 'root':
        return <Fragment>{serialize(node.children)}</Fragment>
      case 'link':
        return (
          <CMSLink
            key={i}
            className="underline underline-offset-[6px]"
            type={node.fields.linkType === 'internal' ? 'reference' : 'custom'}
            url={node.fields.url}
            reference={node.fields.doc as any}
            newTab={Boolean(node.fields.newTab)}
            label=""
          >
            {serialize(node.children)}
          </CMSLink>
        )
      case 'text':
        let text = <span key={i} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
        if (typeof node.format === 'number') {
          const textFormat = getTextFormats(node.format)
          if (textFormat.bold) {
            text = <strong key={i}>{text}</strong>
          }
          if (textFormat.italic) {
            text = <em key={i}>{text}</em>
          }
          if (textFormat.underline) {
            text = (
              <u style={{ textDecoration: 'underline' }} key={i}>
                {text}
              </u>
            )
          }
          if (textFormat.code) {
            text = <code key={i}>{text}</code>
          }
          if (textFormat.strikethrough) {
            text = (
              <span style={{ textDecoration: 'line-through' }} key={i}>
                {text}
              </span>
            )
          }
        }
        return <Fragment key={i}>{text}</Fragment>
      case 'linebreak':
        return <br key={i} />
      case 'heading':
        switch (node.tag) {
          case 'h1':
            return (
              <h1 className={`text-5xl ${textStyles}`} key={i}>
                {serialize(node.children)}
              </h1>
            )
          case 'h2':
            return (
              <h2 className={`text-4xl ${textStyles}`} key={i}>
                {serialize(node.children)}
              </h2>
            )
          case 'h3':
            return (
              <h3 className={`text-3xl ${textStyles}`} key={i}>
                {serialize(node.children)}
              </h3>
            )
          case 'h4':
            return (
              <h4 className={`text-2xl ${textStyles}`} key={i}>
                {serialize(node.children)}
              </h4>
            )
          case 'h5':
            return (
              <h5 className={`text-xl ${textStyles}`} key={i}>
                {serialize(node.children)}
              </h5>
            )
          case 'h6':
            return (
              <h6 className={`text-lg ${textStyles}`} key={i}>
                {serialize(node.children)}
              </h6>
            )
        }
      case 'list':
        switch (node.tag) {
          case 'ul':
            return (
              <div className="w-full flex justify-center xl:justify-start">
                <ul className="list-disc pl-5 text-left" key={i}>
                  {serialize(node.children)}
                </ul>
              </div>
            )
          case 'ol':
            return <ol key={i}>{serialize(node.children)}</ol>
          case 'li': // is this in lexical or is it 'listitem'?
            return <li key={i}>{serialize(node.children)}</li>
        }
      case 'listitem': // to do properly value, format, indent
        return <li key={i}>{serialize(node.children)}</li>
      case 'quote':
        return (
          <blockquote
            key={i}
            className="text-xl italic font-semibold text-center text-gray-900 dark:text-white"
          >
            {serialize(node.children)}
          </blockquote>
        )
      case 'paragraph':
        return (
          <p className={`${textStyles}`} key={i}>
            {serialize(node.children)}
          </p>
        )
      case 'upload':
        return (
          <Media
            className="w-full h-full"
            imgClassName="h-full w-full object-cover rounded-md relative"
            key={i}
            resource={node.value}
          />
        )
      case 'block':
        return <Blocks key={i} blocks={[node.fields]} />
    }
  })
}

export default serialize
