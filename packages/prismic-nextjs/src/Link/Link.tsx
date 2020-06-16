import React from 'react'
import NextLink from 'next/link'
import { useLinkResolver } from './useLinkResolver'
import { usePrismic } from '@stnew/prismic-react'
import { LinkConstructor, Resolvers } from './types'

/**
 * Wrapper for 'next/link'
 * Resolves external or internal links from url strings or Prismic Link fields
 *
 * @param {(string|Object)} href - An absolute url ("/about"), an external URL ("https://..."), or a Prismic Link object
 * @param {string} uid - optional uid parameter passed to href when type of href is string and is an internal link
 * @param {Object} query - optional object of `[key string]: [value: string]` pairs passed to url as query string
 * @param {ReactComponent} as - optional component to replace default <a>. Useful for styled-components
 */

interface LinkProps {
  href: string;
  uid: string;
  query: { [key: string]: string };
  as: React.FC<any> | 'a';
  children: React.ReactNode;
}

function Link({
  href,
  uid,
  query,
  as = 'a',
  children,
  ...rest
}: LinkProps): JSX.Element | null {
  const { linkResolver, hrefResolver, rootResolver } = usePrismic()

  const resolvers: Resolvers = { linkResolver, hrefResolver, rootResolver }
  const link: LinkConstructor | null = useLinkResolver(href, uid, resolvers)

  if (link === null || !children) return null

  const Anchor = as

  if (link.isExternal) {
    return (
      <Anchor href={link.href} {...link.props} {...rest}>
        {children}
      </Anchor>
    )
  }

  return (
    <NextLink
      as={{ pathname: link.as, query }}
      href={{ pathname: link.href, query }}
      passHref
    >
      <Anchor {...link.props} {...rest}>
        {children}
      </Anchor>
    </NextLink>
  )
}

export default Link
