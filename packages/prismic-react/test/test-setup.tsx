import React from 'react'
import { PrismicProvider } from '../src'
import { render, RenderResult } from '@testing-library/react'
import { routes } from '../../../test/routes'
import { sliceMap } from '../../../test/slices'
import { Elements } from 'prismic-reactjs'
import { HTMLSerializerElementMap, HTMLSerializerPropsFunction } from '../src/types'

const linkProps: HTMLSerializerPropsFunction = element => ({
  link: element.data,
})

const imgProps: HTMLSerializerPropsFunction = element => ({
  src: element.url,
  alt: element.alt || '',
  copyright: element.copyright || '',
})

export const elementMap: HTMLSerializerElementMap = {
  [Elements.heading1]: ['h1', { 'aria-hidden': true }],
  [Elements.heading2]: ['h2', { className: 'h2' }],
  [Elements.heading3]: ['h3', { className: 'test-class' }],
  [Elements.paragraph]: ['p'],
  [Elements.list]: ['ul', { className: 'list' }],
  [Elements.listItem]: ['li'],
  [Elements.hyperlink]: ['a', linkProps],
  [Elements.image]: ['img', imgProps],
}

type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];

export function renderWithPrismicProvider(component: RenderUI): RenderResult {
  return render(
    <PrismicProvider
      sliceRegistry={sliceMap}
      urlResolver={routes}
      htmlSerializer={elementMap}
    >
      {component}
    </PrismicProvider>,
  )
}
