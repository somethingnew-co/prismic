import { LinkResolver, PrismicDoc } from '../packages/prismic-types'
import { urlResolver } from '../packages/prismic'

export const testDoc: PrismicDoc = {
  type: 'post',
  uid: 'hello-world',
  link_type: 'Document',
  url: '',
}

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
]

export const routes = {
  'page': {
    href: '/',
    page: '/[[...page]]',
    root: 'homepage',
  },
  'blog':{
    href: '/blog',
    page: '/blog',
  },
  'post': {
    href: '/blog',
    page: '/blog/[...uid]',
  },
}

let { linkResolver, hrefResolver } = urlResolver(routes)

linkResolver = linkResolver as LinkResolver
hrefResolver = hrefResolver as LinkResolver

export { linkResolver, hrefResolver }
