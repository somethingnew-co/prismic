import React from 'react'
import { HTMLSerializerElementMap } from './types'
import { HTMLSerializer } from 'prismic-reactjs'
import serializerThunk from './utils/serializerThunk'

function useHtmlSerializer(hash: HTMLSerializerElementMap): HTMLSerializer<React.ReactNode> {
  return serializerThunk(hash)
}

export default useHtmlSerializer
