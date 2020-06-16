import { useContext } from 'react'
import PrismicContext from './Context'
import { Context } from './types'

function usePrismic(): Context {
  const value = useContext(PrismicContext)
  return value
}

export default usePrismic
