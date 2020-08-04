import React from 'react'
import { PrismicProvider } from '../src'
import { render, RenderResult } from '@testing-library/react'
import TestSlice, { NamedTestSlice } from './TestSlice'
import TestSliceWithState from './TestSliceWithState'
import { linkResolver } from '../../../test/test-utils'

type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];

const ImportedSlice = import('./TestSlice')
const ImportedSliceWithState = import('./TestSliceWithState')
const NamedImportedSliceWithState = import('./TestSliceWithState').then(module => module.NamedTestSliceWithState)

const sliceMap = {
  'test_slice_1': TestSlice,
  'test_slice_2': NamedTestSlice,
  'test_slice_3': ImportedSlice,
  'test_slice_4': TestSliceWithState,
  'test_slice_5': ImportedSliceWithState,
  'test_slice_6': NamedImportedSliceWithState,
}

export function renderWithPrismicProvider(component: RenderUI): RenderResult {
  return render(
    <PrismicProvider slices={sliceMap} linkResolver={linkResolver}>
      {component}
    </PrismicProvider>,
  )
}
