import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email'
  validate?: (value: string) => boolean | string
  placeholder?: string
  disabled?: boolean
}

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
  validate,
  placeholder,
  disabled,
}) => {
  return (
    // add inputWrap styles
    <div>
      {/* add label styles */}
      <label htmlFor="name">
        {label}
        {/* add asterik styles */}
        {required ? <span>&nbsp;*</span> : ''}
      </label>
      {type === 'textarea' ? (
        // add input, textarea and if error, error styles
        <textarea
          className={[].filter(Boolean).join(' ')}
          rows={3}
          placeholder={placeholder}
          {...register(name, {
            required,
            validate,
          })}
          disabled={disabled}
        />
      ) : (
        // add input and error styles
        <input
          className={[].filter(Boolean).join(' ')}
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required,
            validate,
            ...(type === 'email'
              ? {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email',
                  },
                }
              : {}),
          })}
          disabled={disabled}
        />
      )}
      {/* add errorMessage styles */}
      {error && (
        <div>
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </div>
  )
}
