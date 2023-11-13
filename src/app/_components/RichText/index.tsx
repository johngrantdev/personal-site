import React from 'react'

import serialize from './serialize'

const RichText: React.FC<{ className?: string; content: any }> = ({ className, content }) => {
  if (!content) {
    return null
  }

  return (
    <div className={['first:mt-0 last:mb-0', className].filter(Boolean).join(' ')}>
      {serialize(content)}
    </div>
  )
}

export default RichText
