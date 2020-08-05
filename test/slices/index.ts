import TestSlice, { NamedTestSlice } from './TestSlice'
import TestSliceWithState from './TestSliceWithState'

const ImportedSlice = import('./TestSlice')
const ImportedSliceWithState = import('./TestSliceWithState')
const NamedImportedSliceWithState = import('./TestSliceWithState').then(module => module.NamedTestSliceWithState)

export const sliceMap = {
  'test_slice_1': TestSlice,
  'test_slice_2': NamedTestSlice,
  'test_slice_3': ImportedSlice,
  'test_slice_4': TestSliceWithState,
  'test_slice_5': ImportedSliceWithState,
  'test_slice_6': NamedImportedSliceWithState,
}
