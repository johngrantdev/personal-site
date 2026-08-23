import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import sharp from 'sharp'
import { getPayload } from 'payload'

const { default: config } = await import('../payload.config')

const payload = await getPayload({ config })

try {
  console.log('Wiping collections...')
  const collections = ['pages', 'posts', 'redirects', 'media', 'uploads', 'category', 'clients', 'keywords'] as const
  for (const collection of collections) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }

  const tmpDir = os.tmpdir()

  // Generate images
  console.log('Generating images...')
  const light = path.join(tmpDir, 'light.png')
  const dark = path.join(tmpDir, 'dark.png')
  const mobile = path.join(tmpDir, 'mobile.png')
  const mobileDark = path.join(tmpDir, 'mobile-dark.png')
  const diagram = path.join(tmpDir, 'diagram.svg')

  await sharp({ create: { width: 2400, height: 1350, channels: 3, background: '#3b82f6' } }).png().toFile(light)
  await sharp({ create: { width: 2400, height: 1350, channels: 3, background: '#1e293b' } }).png().toFile(dark)
  await sharp({ create: { width: 800, height: 1200, channels: 3, background: '#22c55e' } }).png().toFile(mobile)
  await sharp({ create: { width: 800, height: 1200, channels: 3, background: '#14532d' } }).png().toFile(mobileDark)
  fs.writeFileSync(diagram, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><style>.a{fill:#111}</style><rect class="a" x="5" y="5" width="90" height="50" rx="6"/><text x="50" y="35" text-anchor="middle" fill="#fff" font-size="12">SVG</text></svg>')

  // Create uploads
  console.log('Creating uploads...')
  const lightId = (await payload.create({ collection: 'uploads', data: {}, file: { data: fs.readFileSync(light), mimetype: 'image/png', name: 'light.png', size: fs.statSync(light).size } })).id
  const darkId = (await payload.create({ collection: 'uploads', data: {}, file: { data: fs.readFileSync(dark), mimetype: 'image/png', name: 'dark.png', size: fs.statSync(dark).size } })).id
  const mobileId = (await payload.create({ collection: 'uploads', data: {}, file: { data: fs.readFileSync(mobile), mimetype: 'image/png', name: 'mobile.png', size: fs.statSync(mobile).size } })).id
  const mobileDarkId = (await payload.create({ collection: 'uploads', data: {}, file: { data: fs.readFileSync(mobileDark), mimetype: 'image/png', name: 'mobile-dark.png', size: fs.statSync(mobileDark).size } })).id
  const diagramId = (await payload.create({ collection: 'uploads', data: {}, file: { data: fs.readFileSync(diagram), mimetype: 'image/svg+xml', name: 'diagram.svg', size: fs.statSync(diagram).size } })).id

  // Rich text helper
  const text = (content: string, format = 0) => ({ mode: 'normal', text: content, type: 'text', style: '', detail: 0, format, version: 1 })
  const para = (children: any[]) => ({ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children })
  const heading = (tag: string, children: any[]) => ({ type: 'heading', tag, format: '', indent: 0, version: 1, direction: 'ltr', children })
  const quote = (children: any[]) => ({ type: 'quote', format: '', indent: 0, version: 1, direction: 'ltr', children })
  const list = (tag: string, children: any[]) => ({ type: 'list', tag, listType: tag === 'ul' ? 'bullet' : 'number', start: 1, format: '', indent: 0, version: 1, direction: 'ltr', children })
  const listitem = (children: any[]) => ({ type: 'listitem', value: 1, format: '', indent: 0, version: 1, direction: 'ltr', children })
  const link = (url: string, children: any[], newTab = false) => ({ type: 'link', format: '', indent: 0, version: 1, direction: 'ltr', fields: { linkType: 'custom', url, newTab }, children })
  const internalLink = (pageId: number, children: any[], newTab = false) => ({ type: 'link', format: '', indent: 0, version: 1, direction: 'ltr', fields: { linkType: 'internal', doc: { relationTo: 'pages', value: pageId }, newTab }, children })
  const hr = () => ({ type: 'horizontalrule', version: 1 })
  const br = () => ({ type: 'linebreak', version: 1 })
  const upload = (mediaId: number) => ({ type: 'upload', relationTo: 'media', value: mediaId, format: '', version: 3 })
  const block = (blockType: string, fields: any) => ({ type: 'block', format: '', version: 2, fields: { blockType, ...fields } })
  // Payload stores rich text as { root: <node> }; consumers read content.root.
  const root = (children: any[]) => ({
    root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const, children },
  })

  // Create media
  console.log('Creating media...')
  const media1 = (await payload.create({
    collection: 'media',
    data: {
      alt: 'Full variants',
      caption: root([para([text('Caption with all four variants.')])]),
      media: lightId,
      mediaDark: darkId,
      mediaMobile: mobileId,
      mediaMobileDark: mobileDarkId
    }
  })).id

  const media2 = (await payload.create({
    collection: 'media',
    data: {
      alt: 'Light only',
      media: lightId
    }
  })).id

  const media3 = (await payload.create({
    collection: 'media',
    data: {
      alt: 'Light plus dark',
      caption: root([para([text('Light and dark only.')])]),
      media: lightId,
      mediaDark: darkId
    }
  })).id

  const media4 = (await payload.create({
    collection: 'media',
    data: {
      alt: 'Inline SVG',
      caption: root([para([text('An SVG.')])]),
      media: diagramId
    }
  })).id

  // Create taxonomy
  console.log('Creating taxonomy...')
  const catWriting = (await payload.create({ collection: 'category', data: { title: 'Writing' } })).id
  const catProjects = (await payload.create({ collection: 'category', data: { title: 'Projects' } })).id
  const catNotes = (await payload.create({ collection: 'category', data: { title: 'Notes' } })).id
  const acme = (await payload.create({ collection: 'clients', data: { title: 'Acme Corp' } })).id
  const kwAstro = (await payload.create({ collection: 'keywords', data: { title: 'astro' } })).id
  const kwPayload = (await payload.create({ collection: 'keywords', data: { title: 'payload' } })).id
  const kwPerf = (await payload.create({ collection: 'keywords', data: { title: 'performance' } })).id

  // Create pages
  console.log('Creating pages...')

  // Page: about
  const aboutPage = (await payload.create({
    collection: 'pages',
    data: {
      title: 'About',
      slug: 'about',
      publishedAt: new Date().toISOString(),
      _status: 'published',
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: false,
          sideCol: {
            style: 'singleLayout',
            sideContent1: root([para([text('About sidebar content')])])
          },
          mainCol: {
            style: 'singleLayout',
            column1: root([
              heading('h1', [text('Main Heading')]),
              heading('h2', [text('Section One')]),
              heading('h3', [text('Subsection')]),
              heading('h4', [text('Sub-subsection')]),
              heading('h5', [text('Smaller heading')]),
              heading('h6', [text('Smallest heading')]),
              para([text('About page content goes here.')])
            ])
          }
        }
      ]
    }
  })).id

  // Page: writing
  const writingPage = (await payload.create({
    collection: 'pages',
    data: {
      title: 'Writing',
      slug: 'writing',
      publishedAt: new Date().toISOString(),
      _status: 'published',
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: false,
          sideCol: { style: 'none' },
          mainCol: {
            style: 'postArchive',
            postArchive: { cat: [catWriting], limit: 5 }
          }
        }
      ]
    }
  })).id

  // Page: code-languages
  const codeLangs = ['css', 'dockerfile', 'go', 'graphql', 'handlebars', 'html', 'java', 'javascript', 'kotlin', 'markdown', 'pgsql', 'python', 'rust', 'scss', 'swift', 'typescript', 'xml', 'yaml']
  const codeSnippets: any[] = []
  codeLangs.forEach(lang => {
    codeSnippets.push(heading('h2', [text(lang)]))
    codeSnippets.push(block('code', {
      language: lang,
      code: lang === 'css' ? '.class { color: red; }' :
            lang === 'dockerfile' ? 'FROM node:18\nRUN npm install' :
            lang === 'go' ? 'func main() {\n  fmt.Println("Hello")\n}' :
            lang === 'graphql' ? 'query { user { name } }' :
            lang === 'handlebars' ? '{{#if condition}}\nContent\n{{/if}}' :
            lang === 'html' ? '<div>Hello</div>' :
            lang === 'java' ? 'public class Main {\n  public static void main(String[] args) { }\n}' :
            lang === 'javascript' ? 'const greeting = "Hello"\nconsole.log(greeting)' :
            lang === 'kotlin' ? 'fun main() {\n  println("Hello")\n}' :
            lang === 'markdown' ? '# Heading\n\nParagraph' :
            lang === 'pgsql' ? 'SELECT * FROM users;' :
            lang === 'python' ? 'print("Hello")\nprint("World")' :
            lang === 'rust' ? 'fn main() {\n  println!("Hello");\n}' :
            lang === 'scss' ? '$color: red;\n.class { color: $color; }' :
            lang === 'swift' ? 'print("Hello")' :
            lang === 'typescript' ? 'const greeting: string = "Hello"\nconsole.log(greeting)' :
            lang === 'xml' ? '<root><item>value</item></root>' :
            lang === 'yaml' ? 'key: value\narray:\n  - item1' : 'code'
    }))
  })

  const codeLangsPage = (await payload.create({
    collection: 'pages',
    data: {
      title: 'Code Languages',
      slug: 'code-languages',
      publishedAt: new Date().toISOString(),
      _status: 'published',
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: false,
          sideCol: { style: 'none' },
          mainCol: {
            style: 'singleLayout',
            column1: root(codeSnippets)
          }
        }
      ]
    }
  })).id

  // Page: kitchen-sink
  const kitchenSinkPage = (await payload.create({
    collection: 'pages',
    data: {
      title: 'Kitchen Sink',
      slug: 'kitchen-sink',
      publishedAt: new Date().toISOString(),
      _status: 'published',
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: true,
          fullH: false,
          sideCol: {
            style: 'twoRows',
            sideContent1: root([para([text('First sidebar row')])]),
            sideContent2: root([para([text('Second sidebar row')])])
          },
          mainCol: {
            style: 'twoColumns',
            column1: root([
              para([text('Text with ', 0), text('bold', 1), text(' and ', 0), text('italic', 2)]),
              block('cta', {
                invertBackground: false,
                richText: root([para([text('CTA text')])]),
                lnks: [{ link: { type: 'custom', url: 'https://example.com', label: 'Action', newTab: false, apprnce: 'primary' } }]
              }),
              block('code', { language: 'typescript', code: 'const x = 1' }),
              block('mediaBlock', {
                aspectRatio: 'square',
                sideCaption: true,
                layout: 'default',
                media1: media1,
                media1ShowCaption: true,
                media2: media2,
                media2ShowCaption: false,
                media3: media3,
                media3ShowCaption: false
              }),
              block('vimeoBlock', { videoId: '76979871', previewImage: media1 })
            ]),
            column2: root([para([text('Second column content')])])
          }
        }
      ]
    }
  })).id

  // Page: home (needs about page id)
  const homePage = (await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      publishedAt: new Date().toISOString(),
      _status: 'published',
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: true,
          sideCol: {
            style: 'hero',
            hero: {
              media: media1,
              desc: root([para([text('Welcome to the site')])]),
              lnks: [
                { link: { type: 'reference', reference: { relationTo: 'pages', value: aboutPage }, label: 'About', newTab: false, apprnce: 'primary' } }
              ]
            }
          },
          mainCol: {
            style: 'singleLayout',
            column1: root([para([text('Home page content')])])
          }
        },
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: false,
          sideCol: { style: 'none' },
          mainCol: {
            style: 'postArchive',
            postArchive: { cat: [], limit: 10 }
          }
        }
      ]
    }
  })).id

  // Post 1: hello-astro
  console.log('Creating posts...')
  const post1Content = root([
    heading('h2', [text('Introduction')]),
    heading('h3', [text('Getting Started')]),
    para([text('This is a paragraph with ', 1), text('bold', 1), text(', ', 0), text('italic', 2), text(', and ', 0), text('code', 16), text('.')]),
    quote([para([text('A helpful quote about Astro.')])]),
    list('ul', [
      listitem([para([text('First point')])]),
      listitem([para([text('Second point')])])
    ]),
    list('ol', [
      listitem([para([text('First step')])]),
      listitem([para([text('Second step')])])
    ]),
    para([internalLink(aboutPage, [text('Internal link')], false)]),
    para([link('https://example.com', [text('External link')])]),
    hr(),
    para([upload(media1)]),
    block('cta', {
      invertBackground: false,
      richText: root([para([text('Call to action')])]),
      lnks: [
        { link: { type: 'custom', url: 'https://example.com', label: 'Primary', newTab: false, apprnce: 'primary' } },
        { link: { type: 'custom', url: 'https://example.com/secondary', label: 'Secondary', newTab: false, apprnce: 'secondary' } }
      ]
    }),
    block('code', { language: 'typescript', code: 'const greeting = "Hello, Astro!"\nconsole.log(greeting)' }),
    block('mediaBlock', {
      aspectRatio: 'default',
      sideCaption: false,
      layout: 'default',
      media1: media1,
      media1ShowCaption: false,
      media2: media2,
      media2ShowCaption: false,
      media3: media3,
      media3ShowCaption: false
    }),
    block('vimeoBlock', { videoId: '76979871', previewImage: media1 })
  ])

  const post1 = (await payload.create({
    collection: 'posts',
    data: {
      title: 'Hello Astro',
      description: 'An introduction to building with Astro',
      slug: 'hello-astro',
      category: catWriting,
      keywords: [kwAstro, kwPerf],
      publishedAt: new Date().toISOString(),
      _status: 'published',
      card: {
        media: media1,
        backgroundColour: '#3b82f6',
        overlayImage: true,
        showDate: true,
        hideTitle: false
      },
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: false,
          sideCol: { style: 'postHero' },
          mainCol: { style: 'singleLayout', column1: post1Content }
        }
      ]
    }
  })).id

  // Post 2: two-columns
  const post2 = (await payload.create({
    collection: 'posts',
    data: {
      title: 'Two Columns',
      description: 'A two column layout example',
      slug: 'two-columns',
      category: catNotes,
      keywords: [kwPayload],
      publishedAt: new Date().toISOString(),
      _status: 'published',
      card: {
        backgroundColour: '#f43f5e',
        overlayImage: false,
        showDate: false,
        hideTitle: true
      },
      lyout: [
        {
          sidePos: 'fixedSideContentAlways',
          scrSnap: true,
          fullH: true,
          sideCol: { style: 'none' },
          mainCol: {
            style: 'twoColumns',
            column1: root([para([text('Left column text')])]),
            column2: root([para([text('Right column text')])])
          }
        }
      ]
    }
  })).id

  // Post 3: project-write-up
  const post3 = (await payload.create({
    collection: 'posts',
    data: {
      title: 'Project Write Up',
      description: 'A detailed project writeup',
      slug: 'project-write-up',
      category: catProjects,
      keywords: [kwPayload, kwAstro],
      publishedAt: new Date().toISOString(),
      _status: 'published',
      card: {
        media: media3,
        backgroundColour: '#0ea5e9',
        overlayImage: true,
        showDate: false,
        hideTitle: false
      },
      lyout: [
        {
          sidePos: 'scrollSideContent',
          scrSnap: false,
          fullH: false,
          sideCol: {
            style: 'projectHero',
            prjHero: {
              yr: 2025,
              client: acme,
              useDesc: false,
              cDesc: root([para([text('Project description here')])]),
              lnks: [
                { link: { type: 'custom', url: 'https://example.com/project', label: 'View Project', newTab: false, apprnce: 'primary' } }
              ]
            }
          },
          mainCol: {
            style: 'singleLayout',
            column1: root([
              block('mediaBlock', {
                aspectRatio: 'default',
                sideCaption: false,
                layout: 'heroGrid',
                media1: media1,
                media1ShowCaption: true,
                media2: media2,
                media2ShowCaption: true,
                media3: media3,
                media3ShowCaption: true
              }),
              block('mediaBlock', {
                aspectRatio: 'default',
                sideCaption: false,
                layout: 'twoColumn',
                media1: media1,
                media1ShowCaption: false,
                media2: media2,
                media2ShowCaption: false,
                media3: media3,
                media3ShowCaption: false
              })
            ])
          }
        }
      ]
    }
  })).id

  // Post 4: two-rows-side
  const post4 = (await payload.create({
    collection: 'posts',
    data: {
      title: 'Two Rows Side',
      description: 'A two row side layout',
      slug: 'two-rows-side',
      category: catWriting,
      keywords: [kwPerf],
      publishedAt: new Date().toISOString(),
      _status: 'published',
      card: {
        media: media4,
        backgroundColour: '#a855f7',
        overlayImage: false,
        showDate: true,
        hideTitle: false
      },
      lyout: [
        {
          sidePos: 'fixedSideContentWhenVisible',
          scrSnap: false,
          fullH: false,
          sideCol: {
            style: 'twoRows',
            sideContent1: root([para([text('First side content')])]),
            sideContent2: root([para([text('Second side content')])])
          },
          mainCol: {
            style: 'singleLayout',
            column1: root([para([text('Main content')])])
          }
        }
      ]
    }
  })).id

  // Set related posts
  await payload.update({
    collection: 'posts',
    id: post1,
    data: { relatedPosts: [post2, post3] }
  })

  // Create redirects
  console.log('Creating redirects...')
  await payload.create({
    collection: 'redirects',
    data: {
      from: '/old-post',
      to: { type: 'custom', url: '/posts/hello-astro' }
    }
  })

  await payload.create({
    collection: 'redirects',
    data: {
      from: '/old-about',
      to: { type: 'reference', reference: { relationTo: 'pages', value: aboutPage } }
    }
  })

  // Update site global
  console.log('Updating site global...')
  await payload.updateGlobal({
    slug: 'site',
    data: {
      siteTitle: 'John Grant',
      siteDescription: 'Developer and designer.',
      siteSourceLink: 'https://github.com/johngrantdev/personal-site',
      navItems: [
        { link: { type: 'reference', reference: { relationTo: 'pages', value: homePage }, label: 'Home', newTab: false } },
        { link: { type: 'reference', reference: { relationTo: 'pages', value: aboutPage }, label: 'About', newTab: false } },
        { link: { type: 'reference', reference: { relationTo: 'pages', value: writingPage }, label: 'Writing', newTab: false } },
        { link: { type: 'reference', reference: { relationTo: 'pages', value: kitchenSinkPage }, label: 'Kitchen Sink', newTab: false } }
      ]
    }
  })

  // push: true re-adds the dev marker every boot, which hangs `next build`
  // on an interactive migrate prompt.
  const { docs: devMarkers } = await payload.find({
    collection: 'payload-migrations',
    where: { batch: { equals: -1 } },
    pagination: false,
  })
  for (const marker of devMarkers) {
    await payload.delete({ collection: 'payload-migrations', id: marker.id })
  }
  if (devMarkers.length > 0) console.log(`Cleared ${devMarkers.length} dev migration marker(s)`)

  console.log('Seed completed successfully!')
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
