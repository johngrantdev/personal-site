import React from 'react'

// import classes from './index.module.scss'

type Props = {
  invert?: boolean
  className?: string
  children?: React.ReactNode
  id?: string
}

export const BackgroundColor: React.FC<Props> = props => {
  const { id, className, children, invert } = props

  return (
    // add invert and colour styling
    <div id={id} className="bg-zinc-800">
      {children}
    </div>
  )
}
