import React from 'react'
import { Elements, HTMLSerializer } from 'prismic-reactjs'
import { LinkResolver, Routes } from '@stnew/prismic-types'

export type Slice = React.ReactType | Promise<any>

export type SliceMap = Map<string, Slice>

export interface Slices {
  [key: string]: Slice
}

export interface Provider {
  sliceRegistry?: Slices
  urlResolver?: Routes
  htmlSerializer?: HTMLSerializerElementMap
}

export interface Context {
  sliceMap: SliceMap
  linkResolver: LinkResolver
  hrefResolver: LinkResolver
  htmlSerializer: HTMLSerializer<React.ReactNode>
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
