import React from 'react'
import { PrismicLink } from '../src'
import { renderWithPrismicProvider } from './test-setup'
import { PrismicDoc } from '@stnew/prismic-types'

const doc1: PrismicDoc = {
  type: 'page',
  uid: 'homepage',
  link_type: 'Document',
}

const doc2: PrismicDoc = {
  type: 'page',
  uid: 'other-page',
  link_type: 'Document',
}

const doc3: PrismicDoc = {
  type: 'blog',
  uid: '',
  link_type: 'Document',
}

const doc4: PrismicDoc = {
  type: 'post',
  uid: 'hello-world',
  link_type: 'Document',
}

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
  const { container } = renderWithPrismicProvider(<>
    <PrismicLink link={doc1}>Document link</PrismicLink>
    <PrismicLink link={doc2}>Document link</PrismicLink>
    <PrismicLink link={doc3}>Document link</PrismicLink>
    <PrismicLink link={doc4}>Document link</PrismicLink>
    <PrismicLink link={doc2} urlObject={testQuery}>Document link with query</PrismicLink>
    <PrismicLink link={media}>Media link</PrismicLink>
    <PrismicLink link={web}>Web link</PrismicLink>
    <PrismicLink link={webEx}>Web link (target blank)</PrismicLink>
  </>)
  expect(container).toMatchSnapshot()
})
