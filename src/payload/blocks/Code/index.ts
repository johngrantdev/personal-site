import type { Block } from 'payload'
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
        language: 'typescript',
      },
    },
  ],
}
