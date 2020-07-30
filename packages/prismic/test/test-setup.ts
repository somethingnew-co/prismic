import { PrismicDoc } from '@stnew/prismic-types'
import { urlResolver } from '../src'

export const docs: PrismicDoc[] = [
  {
    type: 'test1',
    uid: 'homepage',
    link_type: 'Document',
  },
  {
    type: 'test1',
    uid: 'test',
    link_type: 'Document',
  },

  {
    type: 'test2',
    uid: 'testing123',
    link_type: 'Document',
  },

  {
    type: 'test3',
    uid: '',
    link_type: 'Document',
  },

  {
    type: 'test4',
    uid: 'test',
    link_type: 'Document',
  },

  {
    type: 'test5',
    uid: 'test',
    link_type: 'Document',
  },
  {
    type: 'test6',
    uid: '',
    link_type: 'Document',
  },
]

export const routes = {
  'test1': {
    href: '/',
    page: '/[[...test1]]',
    root: 'homepage',
  },
  'test2': {
    href: '/',
    page: '/[...test2]',
  },
  'test3': {
    href: '/abso',
    page: '/abso',
  },
  'test4': {
    href: '/nest',
    page: '/nest/[test4]',
  },
  'test5': {
    href: '/test/',
    page: '/test/[...test5]',
  },
  'test6': {
    href: '/privacy',
  },
}

export const { linkResolver, hrefResolver } = urlResolver(routes)
