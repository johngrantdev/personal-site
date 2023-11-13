'use client'

import React from 'react'

import { Chevron } from '../../../_components/Chevron'
import { useTheme } from '..'
import { getImplicitPreference } from '../shared'
import { Theme, themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const selectRef = React.useRef<HTMLSelectElement>(null)
  const { setTheme } = useTheme()
  const [show, setShow] = React.useState(false)

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      if (selectRef.current) selectRef.current.value = 'auto'
    } else {
      setTheme(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    if (selectRef.current) {
      selectRef.current.value = preference ?? 'auto'
      setShow(true)
    }
  }, [])

  return (
    <div
      className={`relative transition-opacity ${
        show ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <label htmlFor="theme">
        {/* style to add all: unset */}
        <select
          id="theme"
          onChange={e => onThemeChange(e.target.value as Theme & 'auto')}
          ref={selectRef}
          className="pr-4 bg-transparent border-transparent "
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        {/* add selectIcon styles 
        <div className="absolute right-0 top-0 h-full pointer-events-none w-2">
          add selectIcon styles
          <Chevron className="absolute left-1/2" />
          add iconDown styles
          <Chevron className="absolute left-1/2" />
        </div> */}
      </label>
    </div>
  )
}
