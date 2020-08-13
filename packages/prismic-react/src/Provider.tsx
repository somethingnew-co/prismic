import React from 'react'
import PrismicContext from './Context'
import { Provider, Context } from './types'
import serializeElements from './serializeElements'
import { urlResolver } from '@stnew/prismic'

const PrismicProvider: React.FC<Provider> = ({
  sliceRegistry,
  urlResolver: routeMap,
  htmlSerializer: elementsMap,
  children,
}) => {

  const sliceMap = new Map(Object.entries(sliceRegistry || {}))
  const htmlSerializer = serializeElements(elementsMap || {})
  const { linkResolver, hrefResolver } = urlResolver(routeMap || {})

  const value: Context = {
    sliceMap,
    linkResolver,
    hrefResolver,
    htmlSerializer,
  }

  return (
    <PrismicContext.Provider value={value}>
      {children}
    </PrismicContext.Provider>
  )
}

export default PrismicProvider
