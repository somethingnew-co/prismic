import React from 'react'
import { PrismicLink } from '../src'
import { renderWithPrismicProvider } from './test-setup'
import { PrismicDoc } from '@stnew/prismic-types'
import { docs } from '../../../test/data'

const media: PrismicDoc = {
  link_type: 'Media',
  url: 'https://somethingnew.co/share.png',
}

const web: PrismicDoc = {
  link_type: 'Web',
  url: 'https://somethingnew.co',
}

const webEx: PrismicDoc = {
  link_type: 'Web',
  url: 'https://somethingnew.co',
  target: '_blank',
}

const testQuery = { query: { test_query: 'test query ! 123' } }

test('Prismic Doc', () => {
  for (let i = 0; i < docs.length; i += 1) {
    const { container } = renderWithPrismicProvider(
      <PrismicLink link={docs[i]}>Document link</PrismicLink>,
    )
    expect(container).toMatchSnapshot()
  }
})

test('Prismic Doc with Query', () => {
  for (let i = 0; i < docs.length; i += 1) {
    const { container } = renderWithPrismicProvider(
      <PrismicLink link={docs[i]} urlObject={testQuery}>Document link</PrismicLink>,
    )
    expect(container).toMatchSnapshot()
  }
})

test('Other Links', () => {
  const { container } = renderWithPrismicProvider(<>
    <PrismicLink link={media}>Media link</PrismicLink>
    <PrismicLink link={web}>Web link</PrismicLink>
    <PrismicLink link={webEx}>Web link (target blank)</PrismicLink>
  </>)

  expect(container).toMatchSnapshot()
})
