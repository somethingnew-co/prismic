import React from 'react'
import NextLink from 'next/link'
import { UrlObject } from 'url'
import { PrismicDoc } from '@stnew/prismic-types'
import { usePrismicLink } from './usePrismicLink'

interface Props {
  link: PrismicDoc
  as?: React.ReactType
  urlObject?: UrlObject
}

/**
 * Wrapper for 'next/link'
 * Resolves external or internal links from Prismic Link fragments
 */
const PrismicLink: React.FC<Props> = ({ link, as = 'a', urlObject = {}, children, ...rest }) => {
  const { url, page, isExternal, newTab } = usePrismicLink(link)
  const Anchor = as

  let newTabProps = {}

  if (newTab) {
    newTabProps = {
      target:'_blank',
      rel:'noopener noreferrer',
    }
  }

  if (isExternal) {
    if (url.startsWith('http') || url.startsWith('mailto')) {
      return <Anchor href={url} {...newTabProps} {...rest}>{children}</Anchor>
    }
  }

  return (
    <NextLink
      href={page}
      as={{ pathname: url, ...urlObject }} passHref>
      <Anchor {...newTabProps} {...rest}>
        {children}
      </Anchor>
    </NextLink>
  )
}

export default PrismicLink
