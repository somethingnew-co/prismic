import { LinkResolver, Routes, PrismicLink } from '@stnew/prismic-types'

interface Resolvers {
  linkResolver: LinkResolver
  hrefResolver: LinkResolver
}

function urlResolver(routes: Routes): Resolvers {
  const resolveLink = (key: string) =>
    (doc: PrismicLink): string => {
      if (!doc.type) return '/'

      const route = routes[doc.type]

      if (key === 'href') {
        const uid = doc.uid ? doc.uid : null
        if (uid && uid === route.root) return route[key]
        return route[key] + (uid ? route[key].endsWith('/') ? uid : `/${uid}` : '')
      }

      if (key === 'page') return route[key] || '_error'

      return '/'
    }

  const linkResolver = resolveLink('href')
  const hrefResolver = resolveLink('page')

  return { linkResolver, hrefResolver }
}

export default urlResolver
