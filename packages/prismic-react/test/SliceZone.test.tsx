import React from 'react'
import { act } from '@testing-library/react'
import { PrismicSlice } from '@stnew/prismic-types'
import { SliceZone } from '../src'
import { renderWithPrismicProvider } from './test-setup'
import { slices } from '../../../test/data'

const ExtraSlice:React.FC<PrismicSlice> = ({ primary }: PrismicSlice) => <div>{primary.title}</div>

const additiontalSlices = {
  'test_slice_7': ExtraSlice,
}

test('<SliceZone />', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<SliceZone data={slices} slices={additiontalSlices} />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
