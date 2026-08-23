import path from 'path'
import type { CollectionConfig } from 'payload'

import { workspaceRoot } from '../utilities/workspaceRoot'

// Absolute, so every process agrees regardless of its cwd. UPLOADS_DIR overrides
// it in containers, where the workspace layout does not exist.
export const uploadsDir =
  process.env.UPLOADS_DIR || path.join(workspaceRoot(), 'packages/cms-config/uploads')

export const Uploads: CollectionConfig = {
  slug: 'uploads',
  upload: {
    staticDir: uploadsDir,
    imageSizes: [
      {
        name: 'card',
        width: 600,
        height: 600,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1900,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktopHalf',
        width: 950,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 750,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'tabletHalf',
        width: 425,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'mobile',
        width: 425,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [],
  admin: {
    group: 'Media',
  },
}
