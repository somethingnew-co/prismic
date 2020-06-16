import { LinkResolver } from '@stnew/prismic-types'

function resolver(
  routes: {[ key: string] : string },
  style?: string,
): LinkResolver {

  return function (doc) {
    if (!doc.type || doc.uid === routes.index) return '/'

    let route = routes[doc.type]

    if (route.includes('**') && doc.uid) {
      switch (style) {
        case 'next':
          route = route.replace('**', `[${doc.type}]`)
          break
        case 'prismic':
        default:
          route = route.replace('**', doc.uid)
          break
      }
    }

    return route
  }
}

export default resolver
