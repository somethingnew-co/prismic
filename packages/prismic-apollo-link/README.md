# @stnew/prismic-apollo-client

This package exports:

- `prismicApolloLink` - An ApolloLink to connect to Prismic's GraphQL API

## prismicApolloLink

Install dependencies:

```sh
npm install @stnew/prismic-apollo-link @apollo/client prismic-javascript
```

To connect the the GraphQL API, create a new ApolloClient and pass the link to the constructor:

```js
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { prismicApolloLink } from ' @stnew/prismic-apollo-link'

export const prismicClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: prismicApolloLink({
    repositoryName: 'your-repository-name',
    accessToken: 'YOUR_ACCESS_TOKEN',
  }),
})
```

Now you can use this client to query the API.

```js
import { prismicClient } from 'lib/prismic'

const { data } = await prismicClient.query({
  query: gql`
    query($lang: String!, $uid: String!) {
      blog(lang: $lang, uid: $uid) {
        title
      }
    }
  `,
  variables: {
    uid: 'hello-world',
    lang: 'en-us',
  },
})
```

### Handling Previews

The `prismicApolloLink` takes a second argument which handles preview refs from Prismic. You can handle
this case by making your client a function that accepts the preview data as an argument.

```js
export function prismicClient({ previewData }) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: prismicApolloLink({
        repositoryName: 'your-repository-name',
        accessToken: 'YOUR_ACCESS_TOKEN',
      },
      previewData,
    ),
  })
}
```

And for example, in Next.js you would pass this data to the client.

```js
export async function getStaticProps({ params, preview = false, previewData }) {
  const response = await prismicClient({ previewData }).query({
    query: gql`
      query($lang: String!, $uid: String!) {
        blog(lang: $lang, uid: $uid) {
          title
        }
      }
    `,
    variables: {
      uid: params.uid,
      lang: 'en-us',
    },
  })

  const data = response.data.blog

  return {
    props: {
      data,
      preview,
    },
  }
}
```
