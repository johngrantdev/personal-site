import React from 'react'

export const Message: React.FC<{
  message?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
  className?: string
}> = ({ message, error, success, warning, className }) => {
  const messageToRender = message || error || success || warning

  if (messageToRender) {
    return (
      <div
        className={[
          'p-4 leading-5 w-full',
          className,
          error && 'bg-red-600',
          success && 'bg-green-600',
          warning && 'bg-amber-500',
          !error && !success && !warning && 'bg-zinc-600',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {messageToRender}
      </div>
    )
  }
  return null
}
