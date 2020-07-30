import { hrefResolver, docs } from './test-setup'

test('linkResolver', () => {
  expect(hrefResolver(docs[0])).toEqual('/[[...test1]]')
  expect(hrefResolver(docs[1])).toEqual('/[[...test1]]')
  expect(hrefResolver(docs[2])).toEqual('/[...test2]')
  expect(hrefResolver(docs[3])).toEqual('/abso')
  expect(hrefResolver(docs[4])).toEqual('/nest/[test4]')
  expect(hrefResolver(docs[5])).toEqual('/test/[...test5]')
  expect(hrefResolver(docs[6])).toEqual('_error')
})
