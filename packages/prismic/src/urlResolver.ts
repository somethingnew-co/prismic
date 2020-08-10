import { LinkResolver, Routes, PrismicDoc, Route } from '@stnew/prismic-types'

interface Resolvers {
  linkResolver: LinkResolver
  hrefResolver: LinkResolver
}

export function withUID(doc: PrismicDoc, route: Route): string {
  const { uid } = doc
  const { href, root } = route

  if (uid && root && uid === root) {
    return href
  }

  const append: string = uid
    ? href.endsWith('/')
      ? uid
      : `/${uid}`
    : ''

  return href.concat(append)
}

function urlResolver(routes: Routes): Resolvers {
  const resolveLink = (key: string) =>
    (doc: PrismicDoc): string => {
      if (!doc.type) return '/'

      const route = routes[doc.type]

      if (key === 'href') {
        return withUID(doc, route)
      }

      if (key === 'page') return route[key] || '_error'

      return '/'
    }

  const linkResolver = resolveLink('href')
  const hrefResolver = resolveLink('page')

  return { linkResolver, hrefResolver }
}

export default urlResolver
