'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Highlight } from 'prism-react-renderer'

import { CodeBlock as CodeBlockType } from '../../../payload/payload-types'
import { theme } from './codeStyle'

// todo: add the follwing custom lanaguages to prism-react-renderer
// css, dockerfile, go, handlebars, html, java, postgres, scss, xml, yaml
// also split jsx/tsx from js/ts
const LANGUAGES = {
  graphql: 'graphql',
  javascript: 'jsx',
  kotlin: 'kotlin',
  markdown: 'markdown',
  python: 'python',
  rust: 'rust',
  swift: 'swift',
  typescript: 'tsx',
}

type Props = CodeBlockType & {
  id?: number | string
}

export const CodeBlock: React.FC<Props> = props => {
  const { id, code, language } = props
  const nextTheme = useTheme()
  const [activeTheme, setActiveTheme] = useState(theme('light'))

  useEffect(() => {
    if (nextTheme.theme === 'dark') {
      setActiveTheme(theme('dark'))
    } else {
      setActiveTheme(theme('light'))
    }
  }, [nextTheme.theme])

  return (
    <div
      id={id}
      className="my-4 pl-4 border-zinc-400 dark:border-zinc-800 border-l-4 max-w-main overflow-x-auto"
    >
      <Highlight theme={activeTheme} code={code} language={language ? LANGUAGES[language] : 'tsx'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {/* <span>{`${i + 1} ${i < 9 ? '  ' : ''}${i < 99 ? ' ' : ''}`}</span> */}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
