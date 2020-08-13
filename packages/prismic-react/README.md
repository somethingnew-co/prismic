# @stnew/prismic-react

`@stnew/prismic-react` has peerDepenendencies of `react` and `react-dom`. This package assumes you have a basic React app running and have set up the Prismic client.

This package exports:

- [`PrismicContext`](#prismiccontext) - The React context containing slices and resolver functions
- [`PrismicProvider`](#prismicprovider) - The provider wrapper for passing context to props
- [`SliceZone`](#slicezone) - A component to render slices from Prismic
- [`usePrismic`](#useprismic) - a hook to access PrismicContext
- [`useSerializer`](#useserializer) - a hook to create an HTMLSerializer
- [`serializeElements`](#serializeElements) - A wrapper function to create an HTMLSerializer
- `urlResolver` from [@stnew/prismic](/packages/prismic) ([npm](https://www.npmjs.com/package/@stnew/prismic))

## PrismicContext

For the most part, you'll want to use the [`usePrismic` hook](#useprismic) to access context. If not, it's exported from the package main:

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
import { PrismicProvider } from '@stnew/prismic-react'
import { sliceMap } from 'slices'
import { routeMap } from 'lib/prismic/routes'
import { elementsMap } from 'lib/prismic/rich-text'

function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      sliceRegistry={sliceMap}
      urlResolver={routeMap}
      htmlResolver={elementsMap}
    >
      <Component {...pageProps}>
    </PrismicProvider>
  )
}
```

Prop           | Required | Type
-------------- | -------- | ---------------------------------------------
sliceRegistry         | No      | `{ [key: string]: (props: any) => Element }`
urlResolver   | No      | [Routes object](/packages/prismic)
htmlSerializer | No       | `{ [Element]: [React.ReactNode, { ...props }]`

Pass the [`sliceMap`](#slicemap) and [`routeMap`](/packages/prismic) to their respective props. See the [HTML Serializer](#html-serializer) section to learn more it's usage.

## SliceZone

The SliceZone component will render slices from Prismic.

When you query Prismic's REST API, you'll get back a data object that contains all the fields you set up for that content type. The `body` property is a reserved key in Prismic, and it will contain all of your slices. Pass this to the `data` prop in `SliceZone`.

```jsx
// pages/index.js
import { SliceZone } from '@stnew/prismic-react'
import { prismicClient } from 'lib/prismic'

function Page({ data }) {
  return (
    <main>
      <h1>{data.title}</h1>
      <SliceZone data={data.body} />
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

In order for slices to be available to `SliceZone`, you'll need to setup a map of all your slices. The key is the `slice_type`, the value is your React component.

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

This map can be passed to [`<PrismicProvider>`](#PrismicProvider)'s `slices` prop to make it available to all, or at the page level by passing it to `<SliceZone>`'s `slices` prop. If you have both, it will combine them, so you can have some slices that are global and some slices specific to each page. This helps diminish bundle size.

```jsx
// Pass to PrismicProvider...
function App() {
  return (
    <PrismicProvider slices={sliceMap}>
      {...}
    </PrismicProvider>
}

// ... or pass to SliceZone...
function Page() {
  return <SliceZone data={data.body} slices={sliceMap}>
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
    sliceMap,
    linkResolver,
    hrefResolver,
    htmlSerializer,
  } = usePrismic()

  return <SliceZone slices={sliceMap} />
}
```

## HTML Serializer

Using the serializer requires that you've installed `prismic-reactjs`. If you haven't, install with

```sh
npm install prismic-reactjs
```

Prismic's RichText field returns structured data that needs to be parsed to render as HTML. Wwile you could write your own parser, we recommend using the `RichText` component to render it instead.

```jsx
import { RichText } from 'prsimic-reactjs'

function Page({ data }) {
  return (
    <main>
      <h1>{data.title}</h1>
      <RichText render={data.body_copy} />
    </main>
  )
}
```

The default `RichText` component will render pretty generic HTML. If you need to use special text components, add classNames and props, or render custom HTML, you'll need to write and HTML Serializer

### Mapping the elements

The serializer accepts a special mapping

```jsx
import { Elements } from 'prsimic-reactjs'
import Link from 'next/link'

const elementsMap = {
  [Elements.heading1]: ['h1', { className: 'heading-1' }],
  [Elements.heading2]: ['h2', { className: 'heading-2' }],
  [Elements.paragraph]: ['p', { className: 'paragraph' }],
  [Elements.hyperlink]: [Link, ({ data }) => { href: data.url }]
  [Elements.hyperlink]: ['img', ({ data }) => { href: data.src }]
}
```

You can then pass this map the the `htmlSerializer` prop

```js
function App() {
  return (
    <PrismicProvider
      htmlSerializer={elementsMap}
      urlResolver={routeMap}
    >
      {...app}
    </PrismicProvider>
  )
}
```

The serializer will be returned by the `usePrismic` hook.

```js
import { RichText } from 'prsimic-reactjs'

function TextField({ render }) {
  const { htmlSerializer, linkResolver } = usePrismic()
  return <RichText
    render={render}
    htmlSerializer={htmlSerializer}
    linkResolver={linkResolver}
  />
}
```

### useHtmlSerializer

If you only need to use the HTML serializer in one component, you can use it as a hook.

```js
import { RichText } from 'prsimic-reactjs'
import { elementsMap } from 'lib/prismic/rich-text'
import { linkResolver } from 'lib/prismic/resolvers'
import { useHtmlSerializer } from '@stnew/prismic-react'

function TextField({ render }) {
  const htmlSerializer = useHtmlSerializer(elementMap)

  return <RichText
    render={render}
    htmlSerializer={htmlSerializer}
    linkResolver={linkResolver}
  />
}
```

### serializeElements

If you don't want to use a hook or provider, you can export the wrapper function that creates the serializer.

```js
import { elementsMap } from 'lib/prismic/serializer'
import { serializeElements } from '@stnew/prismic-react'

const htmlSerializer = serializeElements(elementMap)
```
