import { PrismicDoc } from '@stnew/prismic-types'
import { resolvePrismicLink } from './resolvers/prismicLink'
import { resolveHref } from './resolvers/href'
import { LinkConstructor, Resolvers } from '../types'

const externalProps = {
  rel: 'noopener noreferrer',
  target: '_blank',
}

export function useLinkResolver(href: PrismicDoc | string, uid: string, resolvers: Resolvers): LinkConstructor | null {
  // href can be a string or Link field from Prismic, so we handle both with one component
  const isString = typeof href === 'string'
  const isObject = typeof href === 'object'

  if (!href) return null

  // Here we create a link object that will be returned
  const link = {
    as: '',
    href: isString ? href as string : '',
    doc: isObject ? href as PrismicDoc : undefined,
    isExternal: false,
    openInNewTab: false,
    props: {},
  }

  let resolve = null

  if (isObject) resolve = resolvePrismicLink(link, resolvers)
  if (isString) resolve = resolveHref(link, uid, resolvers)

  // Attach props if isExtenral and openInNewTab are true
  if (link.isExternal && link.openInNewTab) link.props = externalProps

  return resolve
}
