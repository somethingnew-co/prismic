import { LinkConstructor, Resolvers } from '../../types'
import { PrismicDoc } from '@stnew/prismic-types'

export function resolveHref(
  link: LinkConstructor,
  uid: string,
  {
    linkResolver,
    hrefResolver,
    rootResolver,
  }: Resolvers,

): LinkConstructor | null {

  const href = link.href as unknown as string

  // Check to see if string starts with http or mailto, and render external link
  if (href.startsWith('http') || href.startsWith('mailto')) {
    link.openInNewTab = true
    link.isExternal = true
  }

  // If not, structure href to handle internal links
  else {
    const doc: PrismicDoc = {
      type: '',
      uid: '',
      link_type: 'Any',
      url: href,
    }

    // Remove head/tail "/" char from href string
    doc.type = href.replace(/^\/|\/$/g, '')

    if (!uid) {
      const split = doc.type.split('/')

      if (split.length > 1) {
        [doc.type] = split
        doc.uid = split.slice(1).join('/')
      } else {
        doc.type = rootResolver
        ;[doc.uid] = split
      }

    } else {
      doc.uid = uid
    }

    link.as = linkResolver(doc)
    link.href = hrefResolver ? hrefResolver(doc) : linkResolver(doc)
  }

  return link
}
