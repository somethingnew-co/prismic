import { LinkConstructor, Resolvers } from '../../types'

export function resolvePrismicLink(link: LinkConstructor, { linkResolver, hrefResolver }: Resolvers): LinkConstructor | null {

  if (!link?.doc?.hasOwnProperty('link_type')) return null

  const { doc } = link
  if (!doc) return null

  const { link_type } = doc

  // If it's link to a Document, resolve immediately
  if (link_type === 'Document') {
    link.as = linkResolver(doc)
    link.href = hrefResolver ? hrefResolver(doc) : linkResolver(doc)
    return link
  }

  // Check if link type is a web link, and if target option is set
  else if (link_type === 'Web') {
    link.openInNewTab = !!doc.target
    link.href = doc.url
    link.isExternal = true
  }

  // Links to 'Media' items always get opened in a new tab
  else if (link_type === 'Media') {
    link.openInNewTab = true
    link.href = doc.url
    link.isExternal = true
  }

  else if (link_type === 'Any') {
    return null
  }

  return link
}
