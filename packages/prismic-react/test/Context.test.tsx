import React from 'react'
import { PrismicContext } from '../src'
import { render } from '@testing-library/react'
import { linkResolver, hrefResolver, testDoc, slices } from '../../../test/test-utils'
import TestSlice from './TestSlice'

test('Context', () => {
  const { container } = render(
    <PrismicContext.Provider value={{
      sliceMap: new Map(Object.entries({
        slice: TestSlice,
      })),
      linkResolver,
      hrefResolver,
    }}>
      <PrismicContext.Consumer>
        {(value) => {
          const SliceComponent = value.sliceMap.get('slice') as React.ReactType
          return (
            <div>
              <SliceComponent {...slices[0]}/>
              <div>{value.linkResolver(testDoc)}</div>
              <div>{value.hrefResolver && value.hrefResolver(testDoc)}</div>
            </div>
          )}}
      </PrismicContext.Consumer>
    </PrismicContext.Provider>,
  )

  expect(container).toMatchSnapshot()

})
