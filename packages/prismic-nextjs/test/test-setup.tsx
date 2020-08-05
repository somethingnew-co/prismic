import { jest } from '@jest/globals'
import React from 'react'
import { PrismicProvider } from '../src'
import { render, RenderResult } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import { linkResolver, hrefResolver } from '../../../test/resolvers'

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

export function renderWithPrismicProvider(component: RenderUI):RenderResult {
  return render(
    <RouterContext.Provider value={mockRouter}>
      <PrismicProvider
        slices={{}}
        linkResolver={linkResolver}
        hrefResolver={hrefResolver}
      >
        {component}
      </PrismicProvider>
    </RouterContext.Provider>,
  )
}
