import React from 'react'
import { urlResolver, PrismicProvider } from '../src'
import { render, RenderResult } from '@testing-library/react'

export const routes = {
  'index': 'homepage',
  'page': '/**',
  'blog': '/blog',
  'post': '/blog/**/*',
}

const linkResolver = urlResolver(routes)
const hrefResolver = urlResolver(routes)

export function renderWithPrismicProvider(component: JSX.Element): RenderResult {
  return render(
    <PrismicProvider
      slices={{}}
      linkResolver={linkResolver}
      hrefResolver={hrefResolver}
      rootResolver="page"
    >
      {component}
    </PrismicProvider>,
  )
}
