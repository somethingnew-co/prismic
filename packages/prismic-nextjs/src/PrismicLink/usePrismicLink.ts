import { usePrismic } from '@stnew/prismic-react'
import { PrismicLink } from '@stnew/prismic-types'

interface PrismicLinkHook {
  url: string
  page: string
  isExternal: boolean
  newTab: boolean
}

export function usePrismicLink(link: PrismicLink): PrismicLinkHook {
  const { linkResolver, hrefResolver } = usePrismic()

  const prismicLink: PrismicLinkHook = {
    url: '',
    page: '',
    isExternal: false,
    newTab: false,
  }

  const type = link.link_type

  switch (type) {
    case 'Document':
      prismicLink.url = linkResolver(link)
      prismicLink.page = !!hrefResolver ? hrefResolver(link) : ''
      return prismicLink

    case 'Web':
      prismicLink.url = link.url || '/'
      prismicLink.isExternal = true
      prismicLink.newTab = !!link.target
      return prismicLink

    case 'Media':
      prismicLink.url = link.url || '/'
      prismicLink.isExternal = true
      prismicLink.newTab = true
      return prismicLink

    default:
      return prismicLink
  }
}
