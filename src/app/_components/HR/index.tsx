import React from 'react'

export const HR: React.FC<{
  className?: string
}> = props => {
  const { className } = props

  // add hr styles
  return <hr className={[className].filter(Boolean).join(' ')} />
}
