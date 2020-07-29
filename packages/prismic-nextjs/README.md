# @stnew/prismic-nextjs

`@stnew/prismic-nextjs` has peerDepenendencies of `react`, `react-dom`, and `next`. This package assumes you have a basic Next.js app running and have integrated the Prismic client.

This package exports:

- `PrismicLink` - A wrapper for `next/link` that handles link resolution.
- `urlResolver` from [@stnew/prismic](/packages/prismic) ([npm](https://www.npmjs.com/package/@stnew/prismic))
- `PrismicContext, PrismicProvider, SliceZone, usePrismic` from [@stnew/prismic-react](/packages/prismic-react) ([npm](https://www.npmjs.com/package/@stnew/prismic-react))

## PrismicLink

The `PrismicLink` component will take a Prismic link fragment and generate an anchor tag. It's using `linkResolver` and `hrefResolver` under the hood, so if you links are not working make sure that you have those set up correctly.

```jsx
import { PrismicLink } from '@stnew/prismic-nextjs'

function NavItem({ link, label }) {
  return (
    <li>
      <PrismicLink link={link}>{label}</PrismicLink>
    </li>
  )
}
```

Prop      | Required | Type                                                                         | Description
--------- | -------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------
link      | Yes      | PrismicDoc fragment                                                          | Resolves urls for Prismic "Link" fields
as        | No       | React Component or string                                                    | Renders the `a` tag as another React component, useful for libraries like [styled-components](https://styled-components.com)
urlObject | No       | [UrlObject](https://nodejs.org/api/url.html#url_url_strings_and_url_objects) | Transforms URL object and appends it to the URL, useful for things like query strings. This won't work on external links.

### Styling PrismicLink

If you're using a css-in-js library like `styled-components`, you might be wondering how you can style a `PrismicLink`.

There are a few ways which we've outlined [in this doc](/docs/with-styled-components.md), for brevity.
