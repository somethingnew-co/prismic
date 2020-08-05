import React from 'react'
import { act } from '@testing-library/react'
import { Slice } from '../src/SliceZone/Slice'
import { renderWithPrismicProvider } from './test-setup'
import TestSlice from '../../../test/slices/TestSlice'
import { slices } from '../../../test/data'


test('<Slice />', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<Slice data={slices[0]} slice={TestSlice} />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
