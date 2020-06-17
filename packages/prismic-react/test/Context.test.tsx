import React from 'react'
import { PrismicContext } from '../src'
import { render } from '@testing-library/react'
import { testDoc } from './test-setup'

interface Slice { (): JSX.Element }

function Slice(): JSX.Element {
  return <div>Hello World</div>
}

test('Context', () => {
  const { container } = render(
    <PrismicContext.Provider value={{
      slices: {
        slice: Slice,
      },
      linkResolver: () => '/test-link',
      hrefResolver: () => '/test-href',
    }}>
      <PrismicContext.Consumer>
        {(value) => {
          const SliceComponent = value.slices.slice as Slice
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
