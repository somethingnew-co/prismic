import React from 'react'
import PrismicContext from './Context'
import { Provider } from './types'

function PrismicProvider({ slices, linkResolver, hrefResolver, rootResolver, children }: Provider): JSX.Element {

  const value = {
    slices: Object.freeze(slices),
    linkResolver,
    hrefResolver,
    rootResolver,
  }

  return <PrismicContext.Provider value={value}>{children}</PrismicContext.Provider>
}

export default PrismicProvider
