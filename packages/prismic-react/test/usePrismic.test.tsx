import { usePrismic } from '../src'

import React from 'react'
import { renderWithPrismicProvider, slices as sliceData, testDoc } from './test-setup'
import { act } from '@testing-library/react'

function UsePrismicExample(): JSX.Element {
  const {
    slices,
    linkResolver,
  } = usePrismic()

  const Slice = slices.test_slice_1 as (props: any) => JSX.Element
  const data = sliceData[0]
  return (
    <>
      <Slice {...data} />
      <div>{linkResolver(testDoc)}</div>
    </>
  )
}

test('usePrismic', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<UsePrismicExample />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
