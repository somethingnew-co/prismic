import { LinkResolver } from '@stnew/prismic-types'

function resolver(
  routes: { [key: string]: string },
  style?: string,
): LinkResolver {

  return function (doc) {
    if (
      !doc.type
      || doc.type === '/'
      || doc.uid === routes.index) {
      return '/'
    }
    let route = routes[doc.type]

    if (route.includes('**') && doc.uid) {
      switch (style) {
        case 'next':
          if (route.includes('**/*')) {
            route = route.replace('**/*', `[...${doc.type}]`)
          } else {
            route = route.replace('**', `[${doc.type}]`)
          } break
        case 'prismic':
        default:
          if (route.includes('**/*')) {
            route = route.replace('**/*', doc.uid)
          } else {
            route = route.replace('**', doc.uid)
          } break
      }
    }

    return route
  }
}

export default resolver
