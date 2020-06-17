import React from 'react'
import { PrismicProvider, urlResolver } from '../src'
import { render, RenderResult } from '@testing-library/react'
import TestSlice from './TestSlice'

const ImportedSlice = import('./TestSlice')

const sliceMap = {
  'test_slice_1': TestSlice,
  'test_slice_2': TestSlice,
  'test_slice_3': ImportedSlice,
}

export const testDoc = {
  type: 'post',
  uid: 'hello-world',
  link_type: 'Any',
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
  'index': 'homepage',
  'page': '/**',
  'blog': '/blog',
  'post': '/blog/**/*',
}

const linkResolver = urlResolver(routes)

export function renderWithPrismicProvider(component: JSX.Element): RenderResult {
  return render(
    <PrismicProvider slices={sliceMap} linkResolver={linkResolver}>
      {component}
    </PrismicProvider>,
  )
}
