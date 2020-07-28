import React from 'react'
import { SliceZone } from '../src'
import { act } from '@testing-library/react'
import { renderWithPrismicProvider } from './test-setup'
import { PrismicSlice } from '@stnew/prismic-types'

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
  {
    primary: {
      title: 'I am added later',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_7',
  },
]

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
