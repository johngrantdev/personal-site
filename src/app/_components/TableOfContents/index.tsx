import React from 'react'

import { usePage } from '../../_providers/Context/Page/pageContext'

const TableOfContents: React.FC = () => {
  const { tableOfContents } = usePage()

  if (!tableOfContents || tableOfContents.length === 0) {
    return null
  }

  // Calculate the highest level (smallest number) heading in the table of contents
  const highestLevel = Math.min(
    ...tableOfContents.map(item => parseInt(item.type.replace('h', ''), 10)),
  )

  // not visible when not 2 column
  return (
    <div className="hidden xl:flex flex-col pt-12">
      <h5 className="text-2xl py-4">Contents</h5>
      {tableOfContents.map((item, i) => {
        // Calculate the indent by its heading type relative to the highest level heading
        const level = parseInt(item.type.replace('h', ''), 10)
        const indentation = level - highestLevel // Indent by 2 spaces for each level difference
        const marginLeftClass = `ml-${indentation}`

        return (
          <a
            key={i}
            href={item.url}
            className={`${marginLeftClass} hover:underline text-md mt-1`}
            style={{ marginLeft: `${indentation * 0.5}rem` }}
          >
            {item.title}
          </a>
        )
      })}
    </div>
  )
}

export default TableOfContents
