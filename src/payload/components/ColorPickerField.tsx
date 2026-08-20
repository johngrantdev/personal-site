'use client'

import { FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const ColorPickerField: TextFieldClientComponent = ({ field, path }) => {
  const { setValue, value } = useField<string>({ path })

  return (
    <div className="field-type text">
      <FieldLabel htmlFor={path} label={field.label} path={path} required={field.required} />
      <input
        aria-label="Background colour"
        id={path}
        type="color"
        value={value || '#000000'}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  )
}
