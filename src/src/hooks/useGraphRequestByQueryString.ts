'use client'
import { gql, useQuery } from '@apollo/client'
import {
	getBasicListOfCharacters,
	getCharactersByName,
  getCharactersByCharacterName
} from '@/graphql/queries'

export function useGraphRequestByQueryString(props: {
	fullNameString?: string
	debouncedValue?: string
	pageNum?: number
}) {
	const { debouncedValue, fullNameString, pageNum } = props
  let chosenQuery
  const variables: {
    name?: string
  } = {}

	if (debouncedValue) {
    chosenQuery = getCharactersByName
    variables.name = debouncedValue
	} else if (fullNameString) {
    chosenQuery = getCharactersByCharacterName
    variables.name = fullNameString
	} else {
    chosenQuery = getBasicListOfCharacters
	}
  
	const { loading, error, data } = useQuery(
		gql(chosenQuery),
		{
			variables: {
				page: pageNum,
				...variables
			},
		},
	)

	if (error) console.log('ERRORO:', error.message)

	return {
		loading,
		data,
	}
}
