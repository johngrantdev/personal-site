import React, { createContext, ReactNode, useContext, useState } from 'react'

interface MenuOpenType {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuOpenContext = createContext<MenuOpenType>({ menuOpen: false, setMenuOpen: () => {} })

interface MenuOpenProviderProps {
  children: ReactNode
}

export const MenuOpenProvider: React.FC<MenuOpenProviderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MenuOpenContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuOpenContext.Provider>
  )
}

export const useMenuOpen = () => useContext(MenuOpenContext)

export default MenuOpenContext
