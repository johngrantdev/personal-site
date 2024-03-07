import * as React from 'react'

export const CollectionInstructions: React.FC = props => {
  const instructions =
    'The main image will be optimized for different resolutions. The dark mode and mobile images can be optionally used when the image does not present well in dark mode or mobile screen sizes.'
  return <h4>{instructions}</h4>
}
