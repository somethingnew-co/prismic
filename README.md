# Prismic

Monorepo for Something New's Prisimic tools.

## Packages

This repo conatins four packages, but you only need to install one based on your needs. Some packages are dependent on each other.

- [@stnew/prismic] - Base JavaScript utilities for Prismic
  - `urlResolver` - A helper function to create link resolvers.
- [@stnew/prismic-react] - Components and utilities for React
  - `PrismicContext` - The React context containing slices and resolver functions
  - `PrismicProvider` - The provider wrapper for passing context to props
  - `SliceZone` - A component to render slices from Prismic
  - `usePrismic` - a hook to access PrismicContext
  - `*` from `@stnew/prismic`
- [@stnew/prismic-nextjs]- Components and utilities for Next.js
  - `Link` - A wrapper for `next/link` that handles link resolution.
  - `*` from `@stnew/prismic`
  - `*` from `@stnew/prismic-react`
- [@stnew/prismic-types] - TypesScript types for Prisimic data

The core package is `@stnew/prismic`:

```sh
npm install @stnew/prismic
```

If you're only using React:

```sh
npm install @stnew/prismic-react
```

If you're only using Next.js:

```sh
npm install @stnew/prismic-nextjs
```

The [prismic-types](/packages/prismic-types) package is optional and only necessary if your project is using TypeScript.

```sh
npm install typescript @stnew/prismic-nextjs @stnew/prismic-types
```

## Connecting to Prismic

There are a lot of ways to access Prismic's API, read [our simple setup guide](docs/connect-to-prismic.md) or the the [official documentation](https://prismic.io/docs) to learn more about Prismic client.

[@stnew/prismic]: /packages/prismic
[@stnew/prismic-react]: /packages/prismic-react
[@stnew/prismic-nextjs]: /packages/prismic-nextjs
[@stnew/prismic-types]: /packages/prismic-types
