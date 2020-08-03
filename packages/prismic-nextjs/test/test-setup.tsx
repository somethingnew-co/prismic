import { jest } from '@jest/globals'
import React from 'react'
import { urlResolver, PrismicProvider } from '../src'
import { render, RenderResult } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'

type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

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

const { linkResolver, hrefResolver } = urlResolver(routes)

export function renderWithPrismicProvider(component: RenderUI):RenderResult {
  return render(
    <RouterContext.Provider value={mockRouter}>
      <PrismicProvider
        slices={{}}
        linkResolver={linkResolver}
        hrefResolver={hrefResolver}
        rootResolver="page"
      >
        {component}
      </PrismicProvider>
    </RouterContext.Provider>,
  )
}
