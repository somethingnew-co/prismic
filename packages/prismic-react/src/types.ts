import React from 'react'
import { LinkResolver } from '@stnew/prismic-types'

export type SliceMap = Map<string, React.ReactType | Promise<any>>

interface Slices {
  [key: string]: React.ReactType | Promise<any> ;
}

export interface Resolvers {
  linkResolver: LinkResolver;
  hrefResolver?: LinkResolver;
  rootResolver?: string;
}

export interface Provider extends Resolvers {
  slices: Slices;
  children: React.ReactNode;
}

export interface Context extends Resolvers {
  sliceMap: SliceMap;
}
