# @stnew/prismic

This package exports:

- `urlResolver` - A helper function to create link resolvers.

## urlResolver

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
