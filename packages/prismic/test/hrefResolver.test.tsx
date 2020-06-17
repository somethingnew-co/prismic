import { urlResolver } from '../src'
import { docs, routes } from './test-setup'

const linkResolver = urlResolver(routes, 'next')
const [test1, test2, test3, test4, test5] = docs

test('linkResolver', () => {
  const result1 = linkResolver(test1)
  const result2 = linkResolver(test2)
  const result3 = linkResolver(test3)
  const result4 = linkResolver(test4)
  const result5 = linkResolver(test5)

  expect(result1).toEqual('/[test1]')
  expect(result2).toEqual('/[...test2]')
  expect(result3).toEqual('/abso')
  expect(result4).toEqual('/nest/[test4]')
  expect(result5).toEqual('/test/[...test5]')
})
