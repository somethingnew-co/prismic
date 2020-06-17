import React from 'react'
import { act } from '@testing-library/react'
import { Slice } from '../src/SliceZone/Slice'
import { renderWithPrismicProvider, slices } from './test-setup'

test('<Slice />', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<Slice data={slices[0]} />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
