import { usePrismic } from '../src'
import { act } from '@testing-library/react'

import React from 'react'
import { renderWithPrismicProvider } from './test-setup'
import { docs, slices as sliceData } from '../../../test/data'
import { PrismicDoc } from '@stnew/prismic-types'

const testDoc = docs.find(doc => doc.type === 'blog_post')

function UsePrismicExample(): JSX.Element {
  const {
    sliceMap,
    linkResolver,
  } = usePrismic()

  const Slice = sliceMap.get('test_slice_1') as (props: any) => JSX.Element
  const data = sliceData[0]

  return (
    <>
      <Slice {...data} />
      <div>{linkResolver(testDoc as PrismicDoc)}</div>
    </>
  )
}

test('usePrismic', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<UsePrismicExample />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
