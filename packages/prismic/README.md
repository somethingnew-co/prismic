# @stnew/prismic

This package exports:

- `urlResolver` - A helper function to create link resolvers.

## urlResolver

The `urlResolver` function will help Prismic and (optionally) Next.js resolve the correct prismic documents when you wire up links.

Inside each function is a hash map. The key is the API ID of your Prismic "Single" or "Repeatable" type.

Each route contains up to three keys:

- `href`: The URL of the page that will resolve to when passed to our `Link` component
- `page`: (optional): The Next.js page to resolve to. Only neccessary if you're using `hrefResolver` or [`PrismicLink`](/packages/prismic-nextjs)
- `root`: (optional): The `uid` of the index page from Prismic

"Single" types, will resolve directly to `href`. "Repeatable" types resolve to a the `href` + the `uid` field, and you can use the `root` field in conjuction with that to filter out the root `uid`, so that your URLs are clean.

### resolvers

The `urlResolver` function will return two more functions.

- `linkResolver` will resolve the url as you would see it in the address bar, such as `/about-us` or `/blog/hello-world`.

- `hrefResolver` is for only for `next/link` components to resolve the correct route, such as `/[page]` or `/blog/[...post]`. If you're not using Next.js don't worry about it.

### Example

#### resolvers.js

```javascript
import { urlResolver } from '@sntew/prismic'

const routeMap = {
  home_page: {
    href: '/',
    page: '/',
  },
  about_page: {
    href: '/about',
    page: '/about',
  }
  privacy_page: {
    href: '/privacy',
    page: '/privacy/[[...uid]]',
    root: 'privacy-policy'
  }
}

export const { linkResolver, hrefResolver}  = urlResolver(routeMap)
```

#### NavLink.js

```jsx
import NextLink from 'next/link'
import { linkResolver, hrefResolver } from './resolvers.js'

function NavLink({ href, label }) {
  return (
    <NextLink as={linkResolver(href)} href={hrefResolver(href)}>
      <a>{label}</a>
    </NextLink>
  )
}
```

### Usage with React

The [@stnew/prismic-react](/packages/prismic-react) package has a Context/Provider pattern, as well as a hook for accessing the linkResolver in any component.
