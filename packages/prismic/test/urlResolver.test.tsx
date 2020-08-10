import { linkResolver, hrefResolver } from '../../../test/resolvers'
import { docs } from '../../../test/data'
import { routes } from '../../../test/routes'
import { withUID } from '../src/urlResolver'

test('linkResolver', () => {
  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i]
    const { type } = doc

    if (type) {
      const route = routes[type]

      expect(linkResolver(doc)).toEqual(withUID(doc, route))
    }
  }
})

test('hrefResolver', () => {
  for (let i = 0; i < docs.length; i += 1) {
    const { type } = docs[i]
    if (type) {
      expect(hrefResolver(docs[i])).toEqual(routes[type].page)
    }
  }
})
