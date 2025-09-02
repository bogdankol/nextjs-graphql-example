'use client'
import { Input } from '@/chadcn/components/ui/input'
import { useEffect, useState } from 'react'
import {
	getBasicListOfCharacters,
	getCharactersByName,
} from '@/graphql/queries'
import { useGraphRequestByQueryString } from '@/hooks/useGraphRequestByQueryString'
import type { TItem, TResData } from '@/lib/types'
import List from '@/components/List'
import Pagination from '@/components/Pagination'
import Skeleton from '@/components/Skeleton'
import ListSkeleton from '@/components/ListSkeleton'

let timer: NodeJS.Timeout

export default function Page() {
	const [inputValue, setInputValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const { data }: TResData = useGraphRequestByQueryString({
    debouncedValue,
    pageNum: currentPage
  })
	const totalPages = data?.characters?.info?.pages

	useGraphRequestByQueryString({
    debouncedValue,
    pageNum: currentPage + 1
  })

	useGraphRequestByQueryString({
    debouncedValue,
    pageNum: currentPage - 1
  })

	useEffect(() => {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			setDebouncedValue(inputValue)
		}, 500)
	}, [inputValue])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [data])

	return (
		<section className={`flex h-full w-full flex-col `}>
			<Input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = e.target.value
					setInputValue(value)
				}}
			/>

			{!data?.characters?.results ? (
				<ListSkeleton />
			) : !!!data.characters.results.length ? (
        <p>No search results. Enter different value</p>
      ) : (
				<>
					<List {...{ items: data.characters.results }} />

					<Pagination
						{...{
							setCurrentPage,
							totalPages,
							currentPage,
						}}
					/>
				</>
			)}
		</section>
	)
}
