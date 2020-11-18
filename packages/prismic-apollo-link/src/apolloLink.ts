import Prismic from 'prismic-javascript'
import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

interface Config {
  repositoryName: string
  accessToken?: string
  defaultLocale?: string
}

interface PreviewData {
  [prop: string]: any
}

interface PrismicApolloLink {
  (config: Config, previewData?: PreviewData): ApolloLink
}

const prismicApolloLink: PrismicApolloLink = (config, previewData) => {
  const { repositoryName, accessToken, defaultLocale } = config
  const apiEndpoint = `https://${repositoryName}.cdn.prismic.io/api/v2`
  const graphqlEndpoint = `https://${repositoryName}.prismic.io/graphql`

  const prismicLink = setContext(async (req, previousContext) => {
    const prismicClient = Prismic.client(apiEndpoint, { accessToken })
    const prismicApi = await prismicClient.getApi()

    const headers = {
      ...previousContext.headers,
      'Accept-Language': defaultLocale || 'en-us',
      'Prismic-ref': previewData?.ref || prismicApi.masterRef.ref,
    }

    if (accessToken) {
      headers.Authorization = `Token ${accessToken}`
    }

    return { headers }
  })

  const httpLink = new HttpLink({
    fetch: (url, options) => fetch(url, options),
    uri: graphqlEndpoint,
    useGETForQueries: true,
  })

  return ApolloLink.from([prismicLink, httpLink])
}

export default prismicApolloLink
