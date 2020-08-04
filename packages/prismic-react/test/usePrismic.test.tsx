import { usePrismic } from '../src'

import React from 'react'
import { renderWithPrismicProvider } from './test-setup'
import { testDoc, slices as sliceData } from '../../../test/test-utils'

import { act } from '@testing-library/react'

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
