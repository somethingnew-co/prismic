import { PrismicDoc, LinkResolver } from '@stnew/prismic-types'

export interface LinkConstructor {
  as: string;
  href: string;
  doc?: PrismicDoc;
  isExternal: boolean;
  openInNewTab: boolean;
  props: any;
}

export interface Resolvers {
  linkResolver: LinkResolver;
  hrefResolver?: LinkResolver;
  rootResolver?: string;
}
