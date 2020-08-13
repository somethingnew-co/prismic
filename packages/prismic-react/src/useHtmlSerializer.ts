import React from 'react'
import { HTMLSerializerElementMap } from './types'
import { HTMLSerializer } from 'prismic-reactjs'
import serializeElements from './serializeElements'

function useHtmlSerializer(elementsMap: HTMLSerializerElementMap): HTMLSerializer<React.ReactNode> {
  return serializeElements(elementsMap)
}

export default useHtmlSerializer
