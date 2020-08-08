import React from 'react'
import { PrismicContext } from '../src'
import { render } from '@testing-library/react'
import { linkResolver, hrefResolver } from '../../../test/resolvers'
import { docs, slices } from '../../../test/data'
import TestSlice from '../../../test/slices/TestSlice'
import { PrismicDoc } from '@stnew/prismic-types'

test('Context', () => {
  const testDoc = docs.find(doc => doc.type === 'blog_post')

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
          const SliceComponent = value.sliceMap?.get('slice') as React.ReactType

          if (!SliceComponent) return null

          return (
            <div>
              <SliceComponent {...slices[0]}/>
              <div>{value.linkResolver(testDoc as PrismicDoc)}</div>
              <div>{value.hrefResolver && value.hrefResolver(testDoc as PrismicDoc)}</div>
            </div>
          )}}
      </PrismicContext.Consumer>
    </PrismicContext.Provider>,
  )

  expect(container).toMatchSnapshot()

})
