import React from 'react'
import { SliceZone } from '../src'
import { act } from '@testing-library/react'
import { renderWithPrismicProvider } from './test-setup'


const slices = [
  {
    primary: {
      title: 'Hello World',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_1',
  },
  {
    primary: {
      title: 'Hola Mundo',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_2',
  },
  {
    primary: {
      title: 'Code-split Component',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_3',
  },
  {
    primary: {
      title: 'I have State',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_4',
  },
  {
    primary: {
      title: 'I am imported with State',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_5',
  },
  {
    primary: {
      title: 'I am named and imported with State',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_6',
  },
]


test('<SliceZone />', async () => {
  const promise = Promise.resolve()

  const { container } = renderWithPrismicProvider(<SliceZone slices={slices} />)

  await act(() => promise)

  expect(container).toMatchSnapshot()
})
