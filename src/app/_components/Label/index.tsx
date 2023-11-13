import React from 'react'

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // add label styles
  return <p>{children}</p>
}
