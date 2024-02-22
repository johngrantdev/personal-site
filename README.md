# Portfolio and Blog Site

This is the repo for my personal portfolio and blog site - [johngrant.dev](https://johngrant.dev).
This is a monorepo containing an express server that hosts the [Next.js](https://nextjs.org) frontend and [Payload](https://payloadcms.com) CMS.

This site can be used as a template by either building from source or using the docker image hosted on [Dockerhub](https://hub.docker.com/r/johngrantdev/personal-site). All personalizations such as site title and description have been implemented into the payload `site settings`.

Technologies/Modules:
- [TypeScript](https://www.typescriptlang.org)
- [Express.js]() - Serving the frontend and CMS
- [Next.js](https://nextjs.org) - Frontend server
- [Payload](https://payloadcms.com) - Headless CMS
- [Postgres]() - Database handled by PayloadCMS
- [GraphQL](https://graphql.org) - internal Next.js <> Payload API
- [Docker](https://docker.com) - Node.js running on Alpine Linux container
- [AWS S3 Storage]() - Using the payload cloud storage plugin
- [React-Spring]() - Used for various animations
- [Prism]() - Code block highlighter

Features
- Responsive design
- Asymetric layout
  - side column can be used for hero blocks, section titles and image captions
- Versitile posts collection that can be used as portfolio and blog entries
- Responsive image layouts - 2 column and 3 section layouts
- Inline SVG file support
  - Allows for SVG files to respond to dark mode theme
  - optimized linked image support
- Code Editor with dark mode support
- Dark mode
- SEO

## Payload



## Access control

Basic role-based access control is setup to determine what users can and cannot do based on their roles, which are:

- `admin`: They can access the Payload admin panel to manage your site. They can see all data and make all operations.
- `user`: They cannot access the Payload admin panel and can perform limited operations based on their user (see below).

This applies to each collection in the following ways:

- `users`: Only admins and the user themselves can access their profile. Anyone can create a user but only admins can delete users.
- `posts`: Everyone can access published posts, but only admins can create, update, or delete them. 
- `pages`: Everyone can access published pages, but only admins can create, update, or delete them.

## Draft Preview

All posts, and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, and posts will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/main/examples/draft-preview).


### Docker

To build the docker package run
`docker build -t personal-site .`
The payload build process requires a postgres database connection.
If the postgres database is running locally provide the container a network flag with the host network `--network=host`.
eg. `docker build -t personal-site . --network=host`
1. Next run `docker-compose up`

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

#### Todo :
- Contact form
- Allow sending out email to a specified person with a link with an attached auth token. The authorized user will then have access to any project work that I don't want to make public (ie. full projects or some process work or sketches within a project).
