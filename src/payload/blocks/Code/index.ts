import { createElement } from 'react'
import { useFormFields } from 'payload/components/forms'
import CodeField from 'payload/dist/admin/components/forms/field-types/Code'
import type { Block, SelectField } from 'payload/types'
import type { Entries } from 'type-fest'

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

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blockss',
  },
  fields: [
    {
      name: 'language',
      options: (Object.entries(LANGUAGES) as Entries<typeof LANGUAGES>).map(([key, value]) => ({
        label: value,
        value: key,
      })),
      required: true,
      type: 'select',
      defaultValue: 'typescript',
    },
    {
      name: 'code',
      required: true,
      type: 'code',
      admin: {
        components: {
          Field(field: SelectField & { path?: string }) {
            // get the relative path of this field and replace with sibling 'language'
            const language = useFormFields(
              ([fields]) => fields[`${field.path?.replace('.code', '.language')}`],
            )
            const key = language.value as keyof typeof LANGUAGES
            if (LANGUAGES[key] === undefined) {
              return null
            }
            const label = LANGUAGES[key]
            return createElement(CodeField, {
              admin: {
                language: key,
              },
              name: field.name,
              path: field.path,
              label,
            })
          },
        },
        language: 'typescript',
      },
    },
  ],
}
