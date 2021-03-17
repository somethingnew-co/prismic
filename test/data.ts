import { PrismicDoc } from '../packages/prismic-types'
import { Elements, RichTextSpan } from 'prismic-reactjs'

export const docs: PrismicDoc[] = [
  {
    type: 'page',
    uid: 'homepage',
    link_type: 'Document',
  },
  {
    type: 'page',
    uid: 'services',
    link_type: 'Document',
  },
  {
    type: 'page',
    uid: 'developers',
    link_type: 'Document',
  },
  {
    type: 'company_page',
    link_type: 'Document',
  },
  {
    type: 'pricing_page',
    link_type: 'Document',
  },
  {
    type: 'teams_index',
    link_type: 'Document',
  },
  {
    type: 'team',
    uid: 'blue-team',
    link_type: 'Document',
  },
  {
    type: 'team',
    uid: 'red-team',
    link_type: 'Document',
  },
  {
    type: 'blog_index',
    link_type: 'Document',
  },
  {
    type: 'blog_post',
    uid: 'hello-world',
    link_type: 'Document',
  },
  {
    type: 'blog_post',
    uid: 'hola-mundo',
    link_type: 'Document',
  },
  {
    type: 'policy',
    uid: 'privacy-policy',
    link_type: 'Document',
  },
  {
    type: 'policy',
    uid: 'terms-and-conditions',
    link_type: 'Document',
  },
]

export const slices = [
  {
    primary: {
      title: 'Hello World',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_1',
  },
  {
    primary: {
      title: 'Hola Mundo',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_2',
  },
  {
    primary: {
      title: 'Code-split Component',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_3',
  },
  {
    primary: {
      title: 'I have State',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_4',
  },
  {
    primary: {
      title: 'I am imported with State',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_5',
  },
  {
    primary: {
      title: 'I am named and imported with State',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_6',
  },
  {
    primary: {
      title: 'I am added later',
    },
    items: [],
    slice_label: null,
    slice_type: 'test_slice_7',
  },
]

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

export const richTextField: TextBlock[] = [
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
      { start: 12, end: 21, type: Elements.strong },
      { start: 22, end: 31, type: Elements.strong },
      {
        data: { link_type: 'Web', url: 'https://somethingnew.co', target: '_blank' },
        end: 58,
        start: 46,
        type: Elements.hyperlink,
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
