import React from 'react'
import { Elements, HTMLSerializer } from 'prismic-reactjs'
import { HTMLSerializerElementMap } from './types'

function serializeElements(map: HTMLSerializerElementMap): HTMLSerializer<React.ReactNode> {
  return function (type, element, content, children, key): React.ReactNode {

    const node = map[type as Elements]

    if (node) {
      const [component, props] = node
      let propagator = props || {}

      if (typeof props === 'function') {
        propagator = props(element)
      }

      const propsWithKey = { ...propagator, key }

      // <img /> elements don't have children
      if (type === Elements.image) {
        return React.createElement(component, propsWithKey)
      }

      return React.createElement(component, propsWithKey, children)
    }
  }
}

export default serializeElements
