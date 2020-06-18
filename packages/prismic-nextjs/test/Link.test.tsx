import React from 'react'
import { Link } from '../src'
import { renderWithPrismicProvider } from './test-setup'

const doc1 = {
  type: 'page',
  uid: 'homepage',
  link_type: 'Document',
  url: '',
}

const doc2 = {
  type: 'page',
  uid: 'other-page',
  link_type: 'Document',
  url: '',
}

const doc3 = {
  type: 'blog',
  uid: '',
  link_type: 'Document',
  url: '',
}

const doc4 = {
  type: 'post',
  uid: 'hello-world',
  link_type: 'Document',
  url: '',
}

const media = {
  link_type: 'Media',
  url: 'https://somethingnew.co/share.png',
}

const web = {
  link_type: 'Web',
  url: 'https://somethingnew.co',
}

const webEx = {
  link_type: 'Web',
  url: 'https://somethingnew.co',
  target: '_blank',
}

test('Prismic Doc', () => {
  const { container } = renderWithPrismicProvider(<>
    <Link href={doc1}>Document link</Link>
    <Link href={doc2}>Document link</Link>
    <Link href={doc3}>Document link</Link>
    <Link href={doc4}>Document link</Link>
    <Link href={media}>Media link</Link>
    <Link href={web}>Web link</Link>
    <Link href={webEx}>Web link (target blank)</Link>
    <Link href={webEx}>Web link (target blank)</Link>
  </>)
  expect(container).toMatchSnapshot()
})


test('String', () => {
  const { container } = renderWithPrismicProvider(<>
    <Link href="/">I am a link</Link>
    <Link href="/blog">I am a link</Link>
    <Link href="/test">I am a link</Link>
    <Link href="post" uid="hello-world">I am a link</Link>
    <Link href="https://somethingnew.co">I am a link</Link>
  </>)
  expect(container).toMatchSnapshot()
})
