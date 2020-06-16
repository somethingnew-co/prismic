import React from 'react'
import { LinkResolver } from '@stnew/prismic-types'

export interface Context {
  slices: { [key: string]: (props: any) => JSX.Element };
  linkResolver: LinkResolver;
  hrefResolver?: LinkResolver;
  rootResolver?: string;
}

export interface Provider extends Context {
  children: React.ReactNode;
}
