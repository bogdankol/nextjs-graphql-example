'use client'
import { Input } from '@/chadcn/components/ui/input'
import { useEffect, useState } from 'react'
import { useGraphRequestByQueryString } from '@/hooks/useGraphRequestByQueryString'
import type { TRespData } from '@/lib/types'
import List from '@/components/List'
import Pagination from '@/components/Pagination'
import ListSkeleton from '@/components/ListSkeleton'
import { itemsStore } from '@/stores/itemsStore'

export const metadata = {
  title: "Rick and Morty characters",
  description: "Look for your favorite Rick and Morty character!",
};

let timer: NodeJS.Timeout

export default function Page() {
	const [inputValue, setInputValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

  const storedGetBasicItemsList = itemsStore(state => state.getBasicListOfCharacters)
  const storedGetCharactersByName = itemsStore(state => state.getCharactersByName)
  const storedItems = itemsStore(state => state.items)
  const storedTotalPages = itemsStore(state => state.totalPages)
  const storedIsFetching = itemsStore(state =>state.isFetching)

	// const { data, loading }: TRespData = useGraphRequestByQueryString({
  //   debouncedValue,
  //   pageNum: currentPage
  // })
	// const totalPages = data?.characters?.info?.pages

  // useGraphRequestByQueryString({
  //   debouncedValue,
  //   pageNum: currentPage
  // })

	// useGraphRequestByQueryString({
  //   debouncedValue,
  //   pageNum: currentPage + 1
  // })

	// useGraphRequestByQueryString({
  //   debouncedValue,
  //   pageNum: currentPage - 1
  // })

	useEffect(() => {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			setDebouncedValue(inputValue)
		}, 500)
	}, [inputValue])

  useEffect(() => {
    storedGetBasicItemsList(currentPage)
  }, [currentPage])

  useEffect(() => {
    if(debouncedValue) {
      storedGetCharactersByName( debouncedValue, currentPage)
    }
  }, [debouncedValue])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [
    // data
    storedItems
  ])

	return (
		<section className={`flex h-full w-full flex-col `}>
			<Input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = e.target.value
					setInputValue(value)
				}}
        placeholder='Enter character name here...'
        className='mt-6'
			/>

			{/* {!data?.characters?.results ? ( */}
      {storedIsFetching ? (
				<ListSkeleton />
			) : !!!storedItems.length ? (
        <p>No search results. Enter different value</p>
      ) : (
				<>
					<List {...{ items: storedItems }} />

					<Pagination
						{...{
							setCurrentPage,
							totalPages: storedTotalPages,
							currentPage,
						}}
					/>
				</>
			)}
		</section>
	)
}
