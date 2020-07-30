import { linkResolver, docs } from './test-setup'

test('linkResolver', () => {
  expect(linkResolver(docs[0])).toEqual('/')
  expect(linkResolver(docs[1])).toEqual('/test')
  expect(linkResolver(docs[2])).toEqual('/testing123')
  expect(linkResolver(docs[3])).toEqual('/abso')
  expect(linkResolver(docs[4])).toEqual('/nest/test')
  expect(linkResolver(docs[5])).toEqual('/test/test')
  expect(linkResolver(docs[6])).toEqual('/privacy')
})
