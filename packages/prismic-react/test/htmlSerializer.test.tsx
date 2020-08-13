import React from 'react'
import { RichText } from 'prismic-reactjs'
import { serializeElements } from '../src'
import { render } from '@testing-library/react'
import { linkResolver } from '../../../test/resolvers'
import { richTextField } from '../../../test/data'
import { elementMap } from './test-setup'

const htmlSerializer = serializeElements(elementMap)

test('HTML Serializer', async () => {
  const { container } = render(
    <RichText render={richTextField} htmlSerializer={htmlSerializer} linkResolver={linkResolver as () => string} />,
  )

  expect(container).toMatchSnapshot()
})
