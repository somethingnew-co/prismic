import React from 'react'
import { RichText } from 'prismic-reactjs'
import { render } from '@testing-library/react'
import { urlResolver } from '@stnew/prismic'

import { routes } from '../../../test/routes'
import { docs, slices, richTextField } from '../../../test/data'
import TestSlice from '../../../test/slices/TestSlice'
import { PrismicDoc } from '@stnew/prismic-types'
import { Context } from '../src/types'
import { PrismicContext, serializeElements } from '../src'
import { elementMap } from './test-setup'

const sliceRegistry = {
  slice: TestSlice,
}

test('Context', () => {
  const testDoc = docs.find(doc => doc.type === 'blog_post')

  const sliceMap = new Map(Object.entries(sliceRegistry || {}))
  const serializedHtml = serializeElements(elementMap || {})
  const resolvers = urlResolver(routes || {})

  const value: Context = {
    sliceMap,
    linkResolver: resolvers.linkResolver,
    hrefResolver: resolvers.hrefResolver,
    htmlSerializer: serializedHtml,
  }

  const { container } = render(
    <PrismicContext.Provider value={value}>
      <PrismicContext.Consumer>
        {(value) => {
          const SliceComponent = value.sliceMap?.get('slice') as React.ReactType

          if (!SliceComponent) return null

          return (
            <div>
              <SliceComponent {...slices[0]}/>
              <div>{value.linkResolver(testDoc as PrismicDoc)}</div>
              <div>{value.hrefResolver(testDoc as PrismicDoc)}</div>
              <RichText render={richTextField} htmlSerializer={value.htmlSerializer} linkResolver={value.linkResolver as () => string} />
            </div>
          )}}
      </PrismicContext.Consumer>
    </PrismicContext.Provider>,
  )

  expect(container).toMatchSnapshot()

})
