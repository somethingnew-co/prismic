import { PrismicDoc } from '../packages/prismic-types'

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
