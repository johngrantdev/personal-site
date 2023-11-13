import React from 'react'

export const LoadingShimmer: React.FC<{
  number?: number
  height?: number // in `base` units
}> = props => {
  const arrayFromNumber = Array.from(Array(props.number || 1).keys())

  return (
    // add loading styles
    <div className="mb-6 last:mb-0">
      {arrayFromNumber.map((_, index) => (
        // add shimmer styles
        <div className="w-full h-14 rounded-sm" key={index} />
      ))}
    </div>
  )
}
