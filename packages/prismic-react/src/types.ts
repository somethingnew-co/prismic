import React from 'react'
import { LinkResolver } from '@stnew/prismic-types'

interface Slices {
  [key: string]: React.ReactType | Promise<any> ;
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
