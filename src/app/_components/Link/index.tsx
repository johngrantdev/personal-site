import React from 'react'
import Link from 'next/link'

import { LinkField, Page } from '../../../payload/payload-types'
import { Button, Props as ButtonProps } from '../Button'

type OptionalLinkField = Partial<LinkField>

type CMSLinkType = OptionalLinkField & {
  children?: React.ReactNode
  className?: string
  invert?: ButtonProps['invert']
  label?: string // overrides to be optional
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label = 'default',
  appearance,
  children,
  className,
  invert,
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  if (!appearance) {
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    if (href || url) {
      return (
        <Link {...newTabProps} href={href || url} className={className}>
          {label && label}
          {children && children}
        </Link>
      )
    }
  }

  return (
    <Button
      className={className}
      newTab={newTab}
      href={href}
      appearance={appearance}
      label={label}
      invert={invert}
    />
  )
}
