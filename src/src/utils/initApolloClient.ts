import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/client'

export default function initApolloClient() {
  const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
  })

  return client
}