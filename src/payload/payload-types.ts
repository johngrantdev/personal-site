/* tslint:disable */

/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    pages: Page
    artifacts: Artifact
    media: Media
    categories: Category
    users: User
    comments: Comment
    redirects: Redirect
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {
    header: Header
    footer: Footer
  }
}

export interface Page {
  id: string
  title: string
  publishedDate?: string
  hero: {
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
    richText: {
      root: RichTextNode
    }
    links?: {
      link: {
        type?: 'reference' | 'custom'
        newTab?: boolean
        reference: {
          relationTo: 'pages'
          value: string | Page
        }
        url: string
        label: string
        appearance?: 'default' | 'primary' | 'secondary'
      }
      id?: string
    }[]
    media: string | Media
  }
  layout: (
    | {
        invertBackground?: boolean
        richText: {
          root: RichTextNode
        }
        links?: {
          link: {
            type?: 'reference' | 'custom'
            newTab?: boolean
            reference: {
              relationTo: 'pages'
              value: string | Page
            }
            url: string
            label: string
            appearance?: 'primary' | 'secondary'
          }
          id?: string
        }[]
        id?: string
        blockName?: string
        blockType: 'cta'
      }
    | {
        invertBackground?: boolean
        columns?: {
          size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
          richText: {
            root: RichTextNode
          }
          enableLink?: boolean
          link?: {
            type?: 'reference' | 'custom'
            newTab?: boolean
            reference: {
              relationTo: 'pages'
              value: string | Page
            }
            url: string
            label: string
            appearance?: 'default' | 'primary' | 'secondary'
          }
          id?: string
        }[]
        id?: string
        blockName?: string
        blockType: 'content'
      }
    | {
        invertBackground?: boolean
        position?: 'default' | 'fullscreen'
        media: string | Media
        id?: string
        blockName?: string
        blockType: 'mediaBlock'
      }
    | {
        introContent: {
          root: RichTextNode
        }
        populateBy?: 'collection' | 'selection'
        relationTo?: 'artifacts'
        categories?: string[] | Category[]
        limit?: number
        showPageRange?: boolean
        selectedDocs?:
          | (
              | {
                  relationTo: 'artifacts'
                  value: string
                }
            )[]
          | (
              | {
                  relationTo: 'artifacts'
                  value: Artifact
                }
            )[]
        populatedDocs?:
          | (
              | {
                  relationTo: 'artifacts'
                  value: string
                }
            )[]
          | (
              | {
                  relationTo: 'artifacts'
                  value: Artifact
                }
            )[]
        populatedDocsTotal?: number
        id?: string
        blockName?: string
        blockType: 'archive'
      }
  )[]
  slug?: string
  meta?: {
    title?: string
    description?: string
    image?: string | Media
  }
  updatedAt: string
  createdAt: string
  _status?: 'draft' | 'published'
}

export interface Media {
  id: string
  alt: string
  caption?: {
    [k: string]: unknown
  }[]
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}

export interface Category {
  id: string
  title?: string
  parent?: string | Category
  breadcrumbs?: {
    doc?: string | Category
    url?: string
    label?: string
    id?: string
  }[]
  updatedAt: string
  createdAt: string
}

export interface RichTextNode {
    // common
    type?: string
    format?: string | number // format is either aligment for paragraph/heading node or a number for a text node
    indent?: number
    version?: number
    children?: RichTextNode[]
    direction?: string
    // heading and list
    tag?: string
    // list
    start?: number
    listType?: string
    // upload and listItem
    value?: {
      id: number
      alt: string
      caption?: string
      updatedAt: string
      createdAt: string
      url: string
      filename: string
      mineType: string
      filesize: number
      width: number
      height: number
    }
    // link
    fields?:
      | {
          url: string
          newTab: string
          linkType: string
          doc?:
            | {
                // just for reference
                value: any
                relationTo?: string
              }
            | any
        }
      | undefined
    // upload and relations
    relationTo?: string
    // text
    mode?: string
    text?: string
    style?: string
    detail?: number
}

export interface Artifact {
  id: string
  title: string
  categories?: string[] | Category[]
  publishedAt?: string
  authors?: string[] | User[]
  populatedAuthors?: {
    id?: string
    name?: string
  }[]
  hero: {
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
    richText: {
      root: RichTextNode
    }
    links?: {
      link: {
        type?: 'reference' | 'custom'
        newTab?: boolean
        reference: {
          relationTo: 'pages'
          value: string | Page
        }
        url: string
        label: string
        appearance?: 'default' | 'primary' | 'secondary'
      }
      id?: string
    }[]
    media: string | Media
  }
  layout: (
    | {
        invertBackground?: boolean
        richText: {
          root: RichTextNode
        }
        links?: {
          link: {
            type?: 'reference' | 'custom'
            newTab?: boolean
            reference: {
              relationTo: 'pages'
              value: string | Page
            }
            url: string
            label: string
            appearance?: 'primary' | 'secondary'
          }
          id?: string
        }[]
        id?: string
        blockName?: string
        blockType: 'cta'
      }
    | {
        invertBackground?: boolean
        columns?: {
          size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
          richText: {
            root: RichTextNode
          }
          enableLink?: boolean
          link?: {
            type?: 'reference' | 'custom'
            newTab?: boolean
            reference: {
              relationTo: 'pages'
              value: string | Page
            }
            url: string
            label: string
            appearance?: 'default' | 'primary' | 'secondary'
          }
          id?: string
        }[]
        id?: string
        blockName?: string
        blockType: 'content'
      }
    | {
        invertBackground?: boolean
        position?: 'default' | 'fullscreen'
        media: string | Media
        id?: string
        blockName?: string
        blockType: 'mediaBlock'
      }
    | {
        introContent: {
          root: RichTextNode
        }
        populateBy?: 'collection' | 'selection'
        relationTo?: 'artifacts'
        categories?: string[] | Category[]
        limit?: number
        showPageRange?: boolean
        selectedDocs?:
          | (
              | {
                  relationTo: 'artifacts'
                  value: string
                }
            )[]
          | (
              | {
                  relationTo: 'artifacts'
                  value: Artifact
                }
            )[]
        populatedDocs?:
          | (
              | {
                  relationTo: 'artifacts'
                  value: string
                }
            )[]
          | (
              | {
                  relationTo: 'artifacts'
                  value: Artifact
                }
            )[]
        populatedDocsTotal?: number
        id?: string
        blockName?: string
        blockType: 'archive'
      }
  )[]
  enablePremiumContent?: boolean
  premiumContent?: (
    | {
        invertBackground?: boolean
        richText: {
          root: RichTextNode
        }
        links?: {
          link: {
            type?: 'reference' | 'custom'
            newTab?: boolean
            reference: {
              relationTo: 'pages'
              value: string | Page
            }
            url: string
            label: string
            appearance?: 'primary' | 'secondary'
          }
          id?: string
        }[]
        id?: string
        blockName?: string
        blockType: 'cta'
      }
    | {
        invertBackground?: boolean
        columns?: {
          size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
          richText: {
            root: RichTextNode
          }
          enableLink?: boolean
          link?: {
            type?: 'reference' | 'custom'
            newTab?: boolean
            reference: {
              relationTo: 'pages'
              value: string | Page
            }
            url: string
            label: string
            appearance?: 'default' | 'primary' | 'secondary'
          }
          id?: string
        }[]
        id?: string
        blockName?: string
        blockType: 'content'
      }
    | {
        invertBackground?: boolean
        position?: 'default' | 'fullscreen'
        media: string | Media
        id?: string
        blockName?: string
        blockType: 'mediaBlock'
      }
    | {
        introContent: {
          root: RichTextNode
        }
        populateBy?: 'collection' | 'selection'
        relationTo?: 'artifacts'
        categories?: string[] | Category[]
        limit?: number
        showPageRange?: boolean
        selectedDocs?:
          | (
              | {
                  relationTo: 'artifacts'
                  value: string
                }
            )[]
          | (
              | {
                  relationTo: 'artifacts'
                  value: Artifact
                }
            )[]
        populatedDocs?:
          | (
              | {
                  relationTo: 'artifacts'
                  value: string
                }
            )[]
          | (
              | {
                  relationTo: 'artifacts'
                  value: Artifact
                }
            )[]
        populatedDocsTotal?: number
        id?: string
        blockName?: string
        blockType: 'archive'
      }
  )[]
  relatedArtifacts?: string[] | Artifact[]
  slug?: string
  meta?: {
    title?: string
    description?: string
    image?: string | Media
  }
  updatedAt: string
  createdAt: string
  _status?: 'draft' | 'published'
}

export interface User {
  id: string
  name?: string
  roles?: ('admin' | 'user')[]
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  salt?: string
  hash?: string
  loginAttempts?: number
  lockUntil?: string
  password?: string
}

export interface Redirect {
  id: string
  from: string
  to: {
    type?: 'reference' | 'custom'
    reference:
      | {
          relationTo: 'pages'
          value: string | Page
        }
      | {
          relationTo: 'artifacts'
          value: string | Artifact
        }
    url: string
  }
  updatedAt: string
  createdAt: string
}

export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}

export interface PayloadMigration {
  id: string
  name?: string
  batch?: number
  updatedAt: string
  createdAt: string
}

export interface Header {
  id: string
  navItems?: {
    link: {
      type?: 'reference' | 'custom'
      newTab?: boolean
      reference: {
        relationTo: 'pages'
        value: string | Page
      }
      url: string
      label: string
    }
    id?: string
  }[]
  updatedAt?: string
  createdAt?: string
}

export interface Footer {
  id: string
  navItems?: {
    link: {
      type?: 'reference' | 'custom'
      newTab?: boolean
      reference: {
        relationTo: 'pages'
        value: string | Page
      }
      url: string
      label: string
    }
    id?: string
  }[]
  updatedAt?: string
  createdAt?: string
}

declare module 'payload' {
  export interface GeneratedTypes {
    collections: {
      pages: Page
      artifacts: Artifact
      media: Media
      categories: Category
      users: User
      comments: Comment
      redirects: Redirect
      'payload-preferences': PayloadPreference
      'payload-migrations': PayloadMigration
    }
    globals: {
      header: Header
      footer: Footer
    }
  }
}
