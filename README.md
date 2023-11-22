# johngrant.dev personal site

This is the repo for my personal site.
This project is based on the [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website) which provided sensible defaults to build from. Payload is a headless CMS that provides a code first developer experience and is built with Node.js using Typescript. I chose it as it provided the functionality I was looking for out of the box while still allowing for easy extensibility.
The server is configured to use Express.js to serve both the Next.js frontend (src/app) and the Payload CMS (/src/payload) together.

Stack:
- [Express.js]() - Serving the frontend and CMS
- [Next.js](https://nextjs.org) - Frontend
- [Payload](https://payloadcms.com) - Headless CMS
- [Postgres]() - Database
- [GraphQL](https://graphql.org) - Internal Payload API
- Written in [TypeScript](https://www.typescriptlang.org)

Modules
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload-admin-bar)
- [React-Spring]()

Features
- Authentication
- blog
- Publication workflow
- Restricted content
- User accounts
- Dark mode
- SEO
- Redirects

#### Changes to the base template include:
- Migrated styling from Sass to TailwindCSS. T
- Configured Postgres as the database
- Removed unneccesery collection types such as. comments and projects
  - Posts are now used for both blog post and project content. Categories are used to filter which posts to show on each section of the site.
- Updated the rich text editor in payload to use Lexical, Lexical provides more functionality including inline blocks which will be used for showing code blocks.
- Removed payload cloud and re-enabled the Next.js caching mechanism
- Custom layout design and styling of the UI
  - React-Spring interaction animations

#### Todo (priority order):
- Contact form
- Allow sending out email to a specified person with a link with an attached auth token. The authorized user will then have access to any project work that I don't want to make public (ie. full projects or some process work or sketches within a project).
- Create a general purpose website template from this project.
- Implement a currently reading/listening to/watching section that interfaces with my content trackers for automatic updates.


### Collections

- #### Users (Authentication)

  Users are auth-enabled and encompass both admins and regular users based on the value of their `roles` field. Only `admin` users can access your admin panel to manage the website whereas `user` can read [restricted content](#restricted-content).

- #### Posts

  Posts are used to generated blog posts and project.
  - Uses payload layout builder to create unique layouts.
  - Draft enabled
  - Categories are used to define which page archive they are displayed.

- #### Pages

  Pages are used for the main static layout eg. home, notes, projects and about.
  - Uses payload layout builder to create unique layouts.
  - Draft enabled

- #### Media

  This is the uploads enabled collection used by pages, posts, and projects to contain media like images, videos, downloads, and other assets.

- #### Categories

  A taxonomy used to group notes and projects together. Categories can be nested inside of one another, for example "Projects > Design".

### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `Header`

  The data required by the header on your front-end like nav links.

- `Footer`

  Same as above but for the footer of your site.

## Access control

Basic role-based access control is setup to determine what users can and cannot do based on their roles, which are:

- `admin`: They can access the Payload admin panel to manage your site. They can see all data and make all operations.
- `user`: They cannot access the Payload admin panel and can perform limited operations based on their user (see below).

This applies to each collection in the following ways:

- `users`: Only admins and the user themselves can access their profile. Anyone can create a user but only admins can delete users.
- `posts`: Everyone can access published posts, but only admins can create, update, or delete them. Some posts may also have content that is only accessible to users who are logged in. See [Premium Content](#premium-content) for more details.
- `projects`: Everyone can access published projects, but only admins can create, update, or delete them.
- `pages`: Everyone can access published pages, but only admins can create, update, or delete them.
- `comments`: Everyone can access published comments, but only admins can access draft comments. Users can create new comments but they will be saved as drafts until an admin approves them.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Restricted Content

Posts can optionally restrict access to content or digital assets behind authentication. This will ensure that only members of your site can access the full post data and its resources. To do this, a `restrictedContent` field is added to the `posts` collection with `read` access control set to check for an authenticated user on the request. Every time a user requests a post, this will only return data to those who have access to it:

```ts
{
  name: 'restrictedContent',
  label: 'Restricted Content',
  type: 'blocks',
  access: {
    read: isLoggedIn,
  },
  fields: [
    // content
  ]
}
```

## Draft Preview

All posts, and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, and posts will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/main/examples/draft-preview).

## SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://github.com/payloadcms/plugin-seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://github.com/payloadcms/plugin-redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

##  Development

1. Run `yarn build` in the project root to create `/build` directory.

### Docker

Todo: write steps to create docker image

1. Next run `docker-compose up`

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

### Seed

To seed the database with the base pages and posts; run `yarn seed`.

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.
