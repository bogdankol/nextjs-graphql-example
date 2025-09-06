import {
	ApolloClient,
	InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

export let client: ApolloClient<NormalizedCacheObject>

export default function initApolloClient() {
  client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  })

  return client
}