import React from 'react'

import { Chevron } from '../Chevron'

export const Pagination: React.FC<{
  page: number
  totalPages: number
  onClick: (page: number) => void
  className?: string
}> = props => {
  const { page, totalPages, onClick, className } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return (
    // add Pagination stlyes
    <div className={['flex gap-3 justify-center', className].filter(Boolean).join(' ')}>
      {/* add button styles, todo: add disabled */}
      <button
        className=" cursor-pointer relative flex p-3 text-zinc-400 border-solid border-zinc-400"
        type="button"
        disabled={!hasPrevPage}
        onClick={() => {
          onClick(page - 1)
        }}
      >
        {/* add icon styles */}
        <Chevron className="w-3 h-3 " rotate={90} />
      </button>
      {/* add pageRange styles */}
      <div className="flex items-center">
        {/* add pageRangeLabel styles */}
        <span>
          Page {page} of {totalPages}
        </span>
      </div>
      {/* add button styles */}
      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() => {
          onClick(page + 1)
        }}
        className=" cursor-pointer relative flex p-3 text-zinc-400 border-solid border-zinc-400"
      >
        {/* add icon styles */}
        <Chevron className="w-3 h-3" rotate={-90} />
      </button>
    </div>
  )
}
