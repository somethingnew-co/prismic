import React from 'react'
import PrismicContext from './Context'
import { Provider, Context } from './types'
import serializerThunk from './utils/serializerThunk'

const PrismicProvider: React.FC<Provider> = ({
  slices,
  linkResolver,
  hrefResolver,
  htmlSerializer,
  children,
}) => {

  const sliceMap = new Map(Object.entries(slices || {}))
  const serializedHtml = serializerThunk(htmlSerializer || {})

  const value: Context = {
    sliceMap,
    linkResolver,
    hrefResolver,
    htmlSerializer: serializedHtml,
  }

  return (
    <PrismicContext.Provider value={value}>
      {children}
    </PrismicContext.Provider>
  )
}

export default PrismicProvider
