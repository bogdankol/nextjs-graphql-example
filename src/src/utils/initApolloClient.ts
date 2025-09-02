import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/client'

export default function initApolloClient() {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  })

  return client
}