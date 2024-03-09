'use client'

import { ReactNode } from 'react'

import { useMenuOpen } from '../../_providers/Context/menuOpenContext'

interface Props {
  children: ReactNode
}

export const PageContainer = ({ children }) => {
  const { menuOpen, setMenuOpen } = useMenuOpen()

  const mobile3DTransform = 'rotate-y-[25deg] translate-y-36 -translate-x-64'
  const tablet3DTransform = 'sm:rotate-y-[15deg] sm:translate-y-44 sm:-translate-x-64'
  const desktop3DTransform = 'xl:rotate-y-0 xl:translate-y-0 xl:translate-x-0'

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="h-screen perspective-750 sm:perspective-1000 transform-style-3d">
        <div
          className={`${
            menuOpen && `${mobile3DTransform} ${tablet3DTransform} ${desktop3DTransform}`
          } origin-top-right relative flex flex-col w-full h-screen overflow-x-scroll font-sans text-lg text-zinc-600 dark:text-zinc-300 transition-all duration-500`}
        >
          <div className="w-full h-full overflow-scroll bg-zinc-300 dark:bg-zinc-900 transition-colors duration-500 drop-shadow-2xl">
            {children}
          </div>
          {menuOpen && (
            <div
              className="absolute top-0 left-0 w-screen h-screen z-1000 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
