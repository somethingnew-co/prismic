import React from 'react'
import { PrismicProvider, urlResolver } from '../src'
import { render, RenderResult } from '@testing-library/react'
import TestSlice, { NamedTestSlice } from './TestSlice'
import TestSliceWithState from './TestSliceWithState'
import { PrismicDoc } from '@stnew/prismic-types'

type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];

const ImportedSlice = import('./TestSlice')
const ImportedSliceWithState = import('./TestSliceWithState')
const NamedImportedSliceWithState = import('./TestSliceWithState').then(module => module.NamedTestSliceWithState)

const sliceMap = {
  'test_slice_1': TestSlice,
  'test_slice_2': NamedTestSlice,
  'test_slice_3': ImportedSlice,
  'test_slice_4': TestSliceWithState,
  'test_slice_5': ImportedSliceWithState,
  'test_slice_6': NamedImportedSliceWithState,
}

export const testDoc: PrismicDoc = {
  type: 'post',
  uid: 'hello-world',
  link_type: 'Document',
  url: '',
}

export const slices = [
  {
    primary: {
      title: 'Hello World',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_1',
  },
  {
    primary: {
      title: 'Hola Mundo',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_2',
  },
  {
    primary: {
      title: 'Code-split Component',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_3',
  },
]

export const routes = {
  'page': {
    href: '/',
    page: '/[[...page]]',
    root: 'homepage',
  },
  'blog':{
    href: '/blog',
    page: '/blog',
  },
  'post': {
    href: '/blog',
    page: '/blog/[...uid]',
  },
}

export const { linkResolver, hrefResolver } = urlResolver(routes)

export function renderWithPrismicProvider(component: RenderUI): RenderResult {
  return render(
    <PrismicProvider slices={sliceMap} linkResolver={linkResolver}>
      {component}
    </PrismicProvider>,
  )
}
