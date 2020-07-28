import React from 'react'
import { act } from '@testing-library/react'
import { Slice } from '../src/SliceZone/Slice'
import { renderWithPrismicProvider, slices } from './test-setup'
import TestSlice from './TestSlice'

test('<Slice />', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<Slice data={slices[0]} slice={TestSlice} />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
