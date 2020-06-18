# Styled Components Examples

## Link

All extra props are passed to the Link component.

You can use styled-component's `as` prop to style other components as Links.

This will render an `a` tag with all of the button styles.

```js
import styled from 'styled-components'
import { Link } from '@stnew/prismic-nextjs'

const StyledButton = styled.button`
  font-size: 16px;
  padding: 1rem;
  background: #f5f5f5;
`

function LinkButton({ href, children }) {
  return (
    <Button as={Link} href={href}>
      {children}
    </Button>
  )
}

```

You can also pass a component to the `as` prop on Link, as long as it's an anchor.

```js
import styled from 'styled-components'
import { Link } from '@stnew/prismic-nextjs'

const Anchor = styled.a`
  font-size: 13px;
  color: lime;
  text-decoration: underline;
`

function LinkButton({ href, children }) {
  return (
    <Link as={Anchor} href={href}>
      {children}
    </Link>
  )
}

```
