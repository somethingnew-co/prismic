# @stnew/prismic-nextjs

`@stnew/prismic-nextjs` has peerDepenendencies of `react`, `react-dom`, and `next`. This package assumes you have a basic Next.js app running and have integrated the Prismic client.

This package exports:

- `Link` - A wrapper for `next/link` that handles link resolution.
- `urlResolver` from [@stnew/prismic](/packages/prismic) ([npm](https://www.npmjs.com/package/@stnew/prismic))
- `PrismicContext, PrismicProvider, SliceZone, usePrismic` from [@stnew/prismic-react](/packages/prismic-react) ([npm](https://www.npmjs.com/package/@stnew/prismic-react))

## Link

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

Prop  | Required | Type                               | Description
----- | -------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------
href  | Yes      | PrismicDoc fragment or `string`    | Resolves urls for Prismic "Link" fields
uid   | No       | `string`                           | Resolves links by Prismic UID field when href is a string
query | No       | `{ [key: string: value: string] }` | Transforms object to a query string and appends it to the URL
as    | No       | React Component                    | Renders the `a` tag as another React component, useful for libraries like [styled-components](https://styled-components.com)

### String links

It will even take a hard-coded url string and generate a normal link

```jsx
<Link href="https://somethingnew.co">Think of Something New</Link>
```

While hard coding links to documents isn't recommended, if you do need to we've got you covered. Passing the document API ID to href will resolve the correct link.

```jsx
<Link href="blog">Blog</Link>
```

The `uid` prop will resolve `doc.uid` for you:

```jsx
<Link href="blog" uid="hello-world">Hello world!</Link>
```

If you have [`rootResolver`](/packages/prismic-react) set up, you can link directly to an absolute path.

```jsx
<Link href="/about-us">About Us</Link>
```

And finally, if you need a query string you can pass a query object to the query prop:

```jsx
<Link href="blog" uid="hello-world" query={{ search: 'fuzzy' }}>Search</Link>
```

### Custom Link component

If you're using a css-in-js library like `styled-components`, you might be wondering how you can style a `Link`.

There are a few ways which we've outlined [in this doc](/docs/with-styled-components.md), for brevity.
