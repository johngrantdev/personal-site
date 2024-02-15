import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

import { CodeBlock as CodeBlockType } from '../../../payload/payload-types'
import theme from './codeStyle'
// import classes from './index.module.scss'

type Props = CodeBlockType & {
  id?: number | string
}

export const CodeBlock: React.FC<Props> = ({ id, code }) => {
  return (
    <div id={id} className="my-4 pl-4 border-zinc-800 border-l-4">
      <Highlight theme={theme} code={code} language="tsx">
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
