# Prismic

Monorepo for Something New's Prisimic tools.

This repo constains 4 packages:

- `@stnew/prismic` - Base JavaScript utilities for Prismic
- `@stnew/prismic-react` - Components and utilities for React
- `@stnew/prismic-nextjs` - Components and utilities for Next.js
- `@stnew/prismic-types` - TypesScript types for Prisimic data

The core package is `@stnew/prismic`. Each package is dependent on each other You only need to install one package as a dependency, depending on your needs.

If only you're using React:

```sh
npm install @stnew/prismic-react
```

If only you're using Next.js, install `@stnew/prismic-nextjs`.

```sh
npm install @stnew/prismic-nextjs
```

The `@stnew/prismic-types` package is optional and only necessary if your project is using TypeScript.

```sh
npm install typescript @stnew/prismic-nextjs @stnew/prismic-types
```

## Connecting to Prismic

There are a lot of ways to access Prismic's API, read [our simple setup guide](docs/connect-to-prismic.md) or the the [official documentation](https://prismic.io/docs) to learn more about Prismic client.

## @stnew/prismic

This package exports:

- `urlResolver` - A helper function to create link resolvers.

### urlResolver

The `urlResolver` function will help Prismic and (optionally) Next.js resolve the correct prismic documents when you wire up links.

Inside each function is a hash map. The key is the API ID of your Prismic single or repeatable type. The value is what url that will resolve to when passed to our `Link` component.

For "Single" types, you can resolve directly to a url. "Repeatable" types resolve to a UID, and you can use the `**` pattern to specify that the slug is dynamic, and the `**/*` pattern to resolve _any_ path.

`linkResolver` will resolve the url as you would see it in the address bar, such as `/about-us` or `/blog/hello-world`.

`hrefResolver` is for only for `next/link` components to resolve the correct route, such as `/[page]` or `/blog/[...post]`. The name is based on the key. You'll need to pass `'next'` as the second argument to enable this.

```javascript
import { urlResolver } from '@sntew/prismic'

const routes = {
  index : 'homepage'
  'page': '/**',          // resolves to '/[page]'
  'blog': '/blog',        // resolves to '/blog
  'post': '/blog/**/*',   // resolves to '/blog/[...post]
  'legal': '/legal/**',   // resolves to '/legal/[legal]
}

// Resolves Prismic links
const linkResolver = urlResolver(routes)

// Resolves next/link
const hrefResolver = urlResolver(routes, 'next')
```

## @stnew/prismic-react

`@stnew/prismic-react` has peerDepenendencies of `react`, `react-dom`. This package assumes you have a basic React app running and have set up the Prismic client.

This package exports:

- `PrismicContext` - The React context containing slices and resolver functions
- `PrismicProvider` - The provider wrapper for passing context to props
- `SliceZone` - A component to render slices from Prismic
- `usePrismic` - a hook to access PrismicContext

### PrismicContext

For the most part, you'll want to use the `usePrismic` hook to access context. If not, it's exported from the package main:

```js
import { PrismicContext } from '@stnew/prismic-react'

function Consumer() {
  return (
    <PrismicContext.Consumer>
      {value => /* render something based on the context value */}
    </PrismicContext.Consumer>
  )
}

```

### PrismicProvider

In order for `@stnew/prismic` components to work, you'll need to wrap your App in `PrismicProvider` and pass a few props.

```jsx
// _app.js
import { PrismicProvider } from '@stnew/prismic'
import { sliceMap } from 'slices'
import { linkResolver, hrefResolver } from 'lib/prismic'

function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      slices={sliceMap}
      linkResolver={linkResolver}
      hrefResolver={hrefResolver}
    >
      <Component {...pageProps}>
    </PrismicProvider>
  )
}
```

Prop         | Required | Type
------------ | -------- | ------------------------------------------------
slices       | Yes      | `{ [key: string]: (props: any) => Element }`
linkResolver | Yes      | `(doc?: PrismicDoc) => string`
hrefResolver | No       | `(doc?: PrismicDoc) => string`
rootResolver | No       | `string`

Pass the [`sliceMap`](#slicemap), [`linkResolver`](#urlresolver), and [`hrefResolver`](#urlresolver) to their respective props. If you're using a "root" page type, pass the type to the root resolver.

### SliceZone

The SliceZone component will render slices from Prismic.

When you query Prismic's REST API, you'll get back a data object that contains all the fields you set up for that content type. The `body` property is a reserved key in Prismic, and it will contain all of your slices. Pass this to the `slices` prop in `SliceZone`.

```jsx
// pages/index.js
import { SliceZone } from '@stnew/prismic-react'
import { prismicClient } from 'lib/prismic'

function Page({ data }) {
  return (
    <main>
      <h1>{data.title}</h1>
      <SliceZone slices={data.body} />
    </main>
  )
}

export async function getStaticProps() {
  const document = await prismicClient.getByUID('page', 'homepage')
  const { data } = document

  return {
    props: {
      data
    }
  }
}
```

#### sliceMap

Each Slice in `data.body` is an object with all of the slice data.

```json
{
  "primary": {},
  "items": [],
  "slice_label": null,
  "slice_type": "slice_name"
}
```

In order for slices to be available to `SliceZone`, you'll need to setup a dictionary of all your slices. Let's create a folder called `slices` in our source directory. In here, we're going to import a few slices we've created and map them in an object. The key is the `slice_type`, the value is your component.

```javascript
// slices/index.js
import { CoolSlice } from './CoolSlice'
import { GoodSlice } from './GoodSlice'

/**
 * @key slice_type
 * @value React Component
 */
export const sliceMap = {
  'cool_slice': CoolSlice,
  'good_slice': GoodSlice,
}
```

`SliceZone` will pass all of the slice data to each component as props.

```javascript
function CoolSlice({ primary, items }) {

  const { title, sub_title } = primary

  return (
    <div>
      <h1>{title}</h1>
      <h2>{sub_title}</h2>
      {items.map((item, i) => (
        <p key={i}>{item.copy}</p>
      ))}
    </div>
  )
}
```

##### Code-Splitting

If your app has a ton of slices, including them on every single page can cause bloat. `SliceZone` lets you dynamically import components for smaller bundles.

```javascript
// slices/index.js
const CoolSlice = import('./CoolSlice')
const GoodSlice = import('./GoodSlice')

export const sliceMap = {
  'cool_slice': CoolSlice,
  'good_slice': GoodSlice,
}
```

This also works with `next/dynamic` imports.

### usePrismic

All of this magic is thanks to the `usePrismic` hook. You probably won't need this, but the hook will return everything from `PrismicContext`.

```js
import { usePrismic } from '@stnew/prismic-react'

function Component() {
  const {
    slices,
    linkResolver,
    hrefResolver,
  } = usePrismic()

  return <SliceZone slices={slices} />
}

```

## @stnew/prismic-nextjs

`@stnew/prismic-nextjs` has peerDepenendencies of `react`, `react-dom`, and `next`. This package assumes you have a basic Next.js app running and have integrated the Prismic client.

This package exports:

- `Link` - A wrapper for `next/link` that handles link resolution.

### Link

The `Link` component will take a Prismic link fragment and generate an anchor tag. It's using `linkResolver` and `hrefResolver` under the hood, so if you links are not working make sure that you have those set up correctly.

```jsx
import { Link } from '@stnew/prismic'

function NavItem({ link, label }) {
  return (
    <li>
      <Link href={link}>{label}</Link>
    </li>
  )
}
```

It will even take a hard-coded url string and generate a normal link

```javascript
<Link href="https://somethingnew.co">Think of Something New</Link>
```

While hard coding links to documents isn't recommended, if you do need to we've got you covered. Passing the document API ID to href will resolve the correct link.

```javascript
<Link href="blog">Blog</Link>
```

The `uid` prop will resolve `doc.uid` for you:

```javascript
<Link href="blog" uid="hello-world">Hellow world!</Link>
```

If you have `rootResolver` set up, you can link directly to any absolute path.

```javascript
<Link href="/about-us">About Us</Link>
```

And finally, if you need a query string you can pass a query object to the query prop:

```javascript
<Link href="blog" uid="hello-world" query={{ search: 'fuzzy' }}>Search</Link>
```

#### Custom Link component

If you're using a css-in-js library like `styled-components`, you might be wondering how you can style a `Link`.

There are a few ways which we've outlined [in this doc](docs/with-styled-components.md), for brevity.
