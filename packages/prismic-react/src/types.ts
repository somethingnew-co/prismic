import React from 'react'
import { LinkResolver } from '@stnew/prismic-types'

interface Slice {
  (props: any): JSX.Element;
}

interface Slices {
  [key: string]: Promise<any> | Slice;
}

export interface Context {
  slices: Slices;
  linkResolver: LinkResolver;
  hrefResolver?: LinkResolver;
  rootResolver?: string;
}

export interface Provider extends Context {
  children: React.ReactNode;
}
