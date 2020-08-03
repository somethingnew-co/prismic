import React from 'react'
import { PrismicContext } from '../src'
import { render } from '@testing-library/react'
import { testDoc, linkResolver, hrefResolver } from './test-setup'

const Slice: React.FC = () => <div>Hello World</div>

test('Context', () => {
  const { container } = render(
    <PrismicContext.Provider value={{
      sliceMap: new Map(Object.entries({
        slice: Slice,
      })),
      linkResolver,
      hrefResolver,
    }}>
      <PrismicContext.Consumer>
        {(value) => {
          const SliceComponent = value.sliceMap.get('slice') as React.FC
          return (
            <div>
              <SliceComponent />
              <div>{value.linkResolver(testDoc)}</div>
              <div>{value.hrefResolver && value.hrefResolver(testDoc)}</div>
            </div>
          )}}
      </PrismicContext.Consumer>
    </PrismicContext.Provider>,
  )

  expect(container).toMatchSnapshot()

})
