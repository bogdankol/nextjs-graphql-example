'use client'
import { gql, useQuery } from '@apollo/client'
import {
	getBasicListOfCharacters,
	getCharactersByName,
} from '@/graphql/queries'

export function useGraphRequestByQueryString(props: {
	id?: number | string
	debouncedValue?: string
	pageNum?: number
}) {
	const { debouncedValue, id, pageNum } = props

	let typeOfRequest: 'getAll' | 'getByName' | 'getbyId'

	if (debouncedValue) {
		typeOfRequest = 'getByName'
	} else if (id) {
		typeOfRequest = 'getbyId'
	} else {
		typeOfRequest = 'getAll'
	}
	const { loading, error, data } = useQuery(
		gql(
			typeOfRequest === 'getAll'
				? getBasicListOfCharacters
				: typeOfRequest === 'getByName'
				? getCharactersByName
				: '',
		),
		{
			variables: {
				page: pageNum,
				...(typeOfRequest === 'getByName' ? { name: debouncedValue } : { id }),
			},
		},
	)

	if (error) console.log('ERRORO:', error.message)

	return {
		loading,
		data,
	}
}
