import React from 'react'
import { Elements, HTMLSerializer } from 'prismic-reactjs'
import { LinkResolver } from '@stnew/prismic-types'

export type SliceMap = Map<string, React.ReactType | Promise<any>>

interface Slices {
  [key: string]: React.ReactType | Promise<any>
}

export interface Resolvers {
  linkResolver: LinkResolver
  hrefResolver?: LinkResolver
}

export interface Provider extends Resolvers {
  slices?: Slices
  htmlSerializer?: Hash
}

export interface Context extends Resolvers {
  sliceMap?: SliceMap
  htmlSerializer?: HTMLSerializer<React.ReactNode>
}

// HTMLSerializer types
export interface PropsObject {
  [prop: string]: any
}
export interface Propagator {
  (element?: any): PropsObject
}

export type Hash = {
  [E in Elements]?: [React.ReactType, (PropsObject | Propagator)?]
}
