import { LinkResolver } from '../packages/prismic-types'
import { urlResolver } from '../packages/prismic/dist'
import { routes } from './routes'

let { linkResolver, hrefResolver } = urlResolver(routes)

linkResolver = linkResolver as LinkResolver
hrefResolver = hrefResolver as LinkResolver

export { linkResolver, hrefResolver }
