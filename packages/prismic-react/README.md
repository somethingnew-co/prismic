# @stnew/prismic-react

`@stnew/prismic-react` has peerDepenendencies of `react`, `react-dom`. This package assumes you have a basic React app running and have set up the Prismic client.

This package exports:

- `PrismicContext` - The React context containing slices and resolver functions
- `PrismicProvider` - The provider wrapper for passing context to props
- `SliceZone` - A component to render slices from Prismic
- `usePrismic` - a hook to access PrismicContext
- `*` from [@stnew/prismic](/packages/prismic)

## PrismicContext

For the most part, you'll want to use the `usePrismic` hook to access context. If not, it's exported from the package main:

```jsx
import { PrismicContext } from '@stnew/prismic-react'

function Consumer() {
  return (
    <PrismicContext.Consumer>
      {value => /* render something based on the context value */}
    </PrismicContext.Consumer>
  )
}

```

## PrismicProvider

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

## SliceZone

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

### sliceMap

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

```jsx
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

```jsx
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

#### Code-Splitting

If your app has a ton of slices, including them on every single page can cause bloat. `SliceZone` lets you dynamically import components for smaller bundles.

```jsx
// slices/index.js
const CoolSlice = import('./CoolSlice')
const GoodSlice = import('./GoodSlice')

export const sliceMap = {
  'cool_slice': CoolSlice,
  'good_slice': GoodSlice,
}
```

This also works with `next/dynamic` imports.

## usePrismic

All of this magic is thanks to the `usePrismic` hook. You probably won't need this, but the hook will return everything from `PrismicContext`.

```jsx
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
