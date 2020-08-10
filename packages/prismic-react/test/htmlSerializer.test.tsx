import React from 'react'
import { RichText, RichTextSpan, Elements } from 'prismic-reactjs'
import { htmlSerializerThunk } from '../src'
import { render } from '@testing-library/react'
import { linkResolver } from '../../../test/resolvers'
import { HTMLSerializerElementMap, HTMLSerializerPropsFunction } from '../src/types'

const linkProps: HTMLSerializerPropsFunction = element => ({
  link: element.data,
})

const imgProps: HTMLSerializerPropsFunction = element => ({
  src: element.url,
  alt: element.alt || '',
  copyright: element.copyright || '',
})

const elementMap: HTMLSerializerElementMap = {
  [Elements.heading1]: ['h1', { 'aria-hidden': true }],
  [Elements.heading2]: ['h2', { className: 'h2' }],
  [Elements.heading3]: ['h3', { className: 'test-class' }],
  [Elements.paragraph]: ['p'],
  [Elements.list]: ['ul', { className: 'list' }],
  [Elements.listItem]: ['li'],
  [Elements.hyperlink]: ['a', linkProps],
  [Elements.image]: ['img', imgProps],
}

export type RichTextBlock = {
  type: Elements
  text: string
  spans: RichTextSpan[]
  alt?: string
  copyright?: string
  dimensions?: { width: number, height: number }
  url?: string
};

interface TextBlock extends RichTextBlock {
  alt?: string
  copyright?: string
  dimensions?: { width: number, height: number }
  url?: string
}

const testData: TextBlock[] = [
  {
    spans: [],
    text: 'Heading 1',
    type: Elements.heading1,
  },
  {
    spans: [],
    text: 'Heading 2',
    type: Elements.heading2,
  },
  {
    spans: [],
    text: 'Heading 3',
    type: Elements.heading3,
  },
  {
    spans: [],
    text: 'If you add another section over here, it splits into a two column layout! ',
    type: Elements.paragraph,
  },
  {
    spans: [
      { start: 12, end: 21, type: 'strong' },
      { start: 22, end: 31, type: 'strong' },
      {
        data: { link_type: 'Web', url: 'https://somethingnew.co', target: '_blank' },
        end: 58,
        start: 46,
        type: 'hyperlink',
      }],
    text: 'And text is formatted correctly. You can even insert links and bulleted lists!',
    type: Elements.paragraph,
  },
  {
    spans: [],
    text: 'Wow, that\'s neat',
    type: Elements.listItem,
  },
  {
    spans: [],
    text: 'Show me more!',
    type: Elements.listItem,
  },
  {
    text: '',
    spans: [],
    alt: 'Alt Text',
    dimensions: { width: 2048, height: 1024 },
    type: Elements.image,
    url: 'https://example.com/image.png',
  },
]


const htmlSerializer = htmlSerializerThunk(elementMap)

test('HTML Serializer', async () => {
  const { container } = render(
    <RichText render={testData} htmlSerializer={htmlSerializer} linkResolver={linkResolver as () => string} />,
  )

  expect(container).toMatchSnapshot()
})
