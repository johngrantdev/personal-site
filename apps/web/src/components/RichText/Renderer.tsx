import { RichText } from '@payloadcms/richtext-lexical/react'
import { renderToStaticMarkup } from 'react-dom/server'

import type { RichTextData } from '../../lib/content'
import { jsxConverters } from './converters'

export const renderRichText = (content: RichTextData): string =>
  renderToStaticMarkup(
    <RichText data={content as any} converters={jsxConverters} disableContainer />,
  )
