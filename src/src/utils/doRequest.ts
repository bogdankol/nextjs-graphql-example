'use client'
import { gql } from '@apollo/client'
import {
	getBasicListOfCharacters,
	getCharactersByName,
	getCharactersByCharacterName,
} from '@/graphql/queries'
import { TRespData } from '@/lib/types'
import { client } from './initApolloClient'

export async function doGraphRequest(props: {
	fullNameString?: string
	debouncedValue?: string
	pageNum?: number
}) {
  if(!client) return 

	const { debouncedValue, fullNameString, pageNum } = props
	let chosenQuery
	const variables: {
		name?: string
    page?: number
	} = {
    page: pageNum
  }

	if (debouncedValue) {
		chosenQuery = getCharactersByName
		variables.name = debouncedValue
	} else if (fullNameString) {
		chosenQuery = getCharactersByCharacterName
		variables.name = fullNameString
	} else {
		chosenQuery = getBasicListOfCharacters
	}

	// const { loading, error, data }: TRespData = useQuery(gql(chosenQuery), {
	// 	variables: {
	// 		page: pageNum,
	// 		...variables,
	// 	},
	// })

  const result: TRespData = await client.query({
    query: gql(chosenQuery),
    variables
  })

  const { loading, data, error } = result

  if (error) {
    throw new Error(error.message)
  }

  let items
  let totalPages
	if (data?.characters?.results) {
    items = data?.characters?.results
	}
	if (data?.characters?.info?.pages) {
    totalPages = data.characters.info.pages
	}

	return {
		loading,
		items,
    totalPages
	}
}
