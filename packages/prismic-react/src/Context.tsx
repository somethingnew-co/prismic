import { createContext } from 'react'
import { Context } from './types'
import { urlResolver } from '@stnew/prismic'
import serializeElements from './serializeElements'

const prismicContext: Context = {
  sliceMap: new Map(),
  linkResolver: urlResolver({}).linkResolver,
  hrefResolver: urlResolver({}).hrefResolver,
  htmlSerializer: serializeElements({}),
}

const PrismicContext = createContext(prismicContext)

export default PrismicContext
