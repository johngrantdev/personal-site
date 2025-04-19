import type { Field } from 'payload/types'

// Todo: make a custom component to show the image thumbnail
// doesn't seem easy right now

export const mediaField: Field = {
  name: 'media',
  type: 'relationship',
  label: 'Image/Video',
  relationTo: 'media',
  required: false,
}
