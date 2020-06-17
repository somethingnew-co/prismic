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

This goes both ways. You can also pass a component to the `as` prop on Link.

```js
import { Button } from 'components/Button'
import { Link } from '@stnew/prismic-nextjs'

function LinkButton({ href, children }) {
  return (
    <Link as={Button} href={href}>
      {children}
    </Link>
  )
}

```
