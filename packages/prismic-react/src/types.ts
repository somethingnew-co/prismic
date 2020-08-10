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
  htmlSerializer?: HTMLSerializerElementMap
}

export interface Context extends Resolvers {
  sliceMap?: SliceMap
  htmlSerializer?: HTMLSerializer<React.ReactNode>
}

// HTMLSerializer types
export interface HTMLSerializerProps {
  [prop: string]: any
}
export interface HTMLSerializerPropsFunction {
  (element?: any): HTMLSerializerProps
}

export type HTMLSerializerElementMap = {
  [E in Elements]?: [React.ReactType, (HTMLSerializerProps | HTMLSerializerPropsFunction)?]
}
