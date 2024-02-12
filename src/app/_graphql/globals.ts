import { LINK_FIELDS } from './link'

export const SITE_SETTINGS = `
  Site {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
    siteTitle
    siteDescription
    siteSourceLink
  }
`

export const SITE_SETTINGS_QUERY = `
query Site {
  ${SITE_SETTINGS}
}
`
