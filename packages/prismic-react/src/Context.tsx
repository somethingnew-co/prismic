import { createContext } from 'react'
import { Context } from './types'

const prismicContext: Context = {
  sliceMap: new Map(),
  linkResolver: () => '/',
  hrefResolver: () => '/',
  rootResolver: '',
}

const PrismicContext = createContext(prismicContext)

export default PrismicContext
