import type { LexicalBlock } from '@payloadcms/richtext-lexical'
import type { SelectField } from 'payload/types'
import type { Entries } from 'type-fest'

import { useFormFields } from '@payloadcms/ui/forms/Form'
import { Code as CodeField } from '@payloadcms/ui/fields//Code'
import { createElement } from 'react'

const LANGUAGES = {
  css: 'CSS',
  dockerfile: 'Dockerfile',
  go: 'Go',
  graphql: 'GraphQL',
  handlebars: 'Handlebars',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  kotlin: 'Kotlin',
  markdown: 'Markdown',
  pgsql: 'PostgresQL',
  python: 'Python',
  rust: 'Rust',
  scss: 'SCSS',
  swift: 'Swift',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
}

export const Code: LexicalBlock = {
  slug: 'code',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: (Object.entries(LANGUAGES) as Entries<typeof LANGUAGES>).map(([key, value]) => ({
        label: value,
        value: key,
      })),
      required: true,
    },
    {
      name: 'code',
      type: 'code',
      admin: {
        components: {
          Field(field: SelectField & { path?: string }) {
            // get the relative path of this field and replace with sibling 'language'
            const language = useFormFields(
              // eslint-disable-next-line react/destructuring-assignment
              ([fields]) => fields[`${field.path?.replace('.code', '.language')}`],
            )
            const key = language.value as keyof typeof LANGUAGES
            if (LANGUAGES[key] === undefined) {
              return null
            }
            const label = LANGUAGES[key]
            return createElement(CodeField, {
              name: field.name,
              label,
              path: field.path,
              width: '100%',
            })
          },
        },
        language: 'typescript',
      },
      required: true,
    },
  ],
  interfaceName: 'CodeBlock',
  labels: {
    plural: 'Code Blockss',
    singular: 'Code Block',
  },
}
