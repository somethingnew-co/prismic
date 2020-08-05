import React from 'react'
import PrismicContext from './Context'
import { Provider, Context } from './types'

function PrismicProvider({ slices, linkResolver, hrefResolver, children }: Provider): JSX.Element {

  const sliceMap = new Map(Object.entries(slices))

  const value: Context = {
    sliceMap,
    linkResolver,
    hrefResolver,
  }

  return <PrismicContext.Provider value={value}>{children}</PrismicContext.Provider>
}

export default PrismicProvider
