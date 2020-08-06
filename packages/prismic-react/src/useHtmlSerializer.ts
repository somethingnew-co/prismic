import React from 'react'
import { Hash } from './types'
import { HTMLSerializer } from 'prismic-reactjs'
import serializerThunk from './utils/serializerThunk'

function useHtmlSerializer(hash: Hash): HTMLSerializer<React.ReactNode> {
  return serializerThunk(hash)
}

export default useHtmlSerializer
