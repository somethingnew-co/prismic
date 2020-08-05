import React from 'react'
import { PrismicProvider } from '../src'
import { render, RenderResult } from '@testing-library/react'
import { linkResolver, hrefResolver } from '../../../test/resolvers'
import { sliceMap } from '../../../test/slices'

type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];

export function renderWithPrismicProvider(component: RenderUI): RenderResult {
  return render(
    <PrismicProvider
      slices={sliceMap}
      linkResolver={linkResolver}
      hrefResolver={hrefResolver}
    >
      {component}
    </PrismicProvider>,
  )
}
