'use client'
import Card from '@/components/Card'
import List from '@/components/List'
import Pagination from '@/components/Pagination'
import { useGraphRequestByQueryString } from '@/hooks/useGraphRequestByQueryString'
import { TRespData } from '@/lib/types'
import { itemsStore } from '@/stores/itemsStore'
import { stat } from 'fs'
import { useEffect, useState } from 'react'

function Content({ transformedCharName }: { transformedCharName: string }) {
	// const { data, loading }: TRespData = useGraphRequestByQueryString({
	// 	fullNameString: transformedCharName,
	// })
  // useGraphRequestByQueryString({
	// 	fullNameString: transformedCharName,
	// })

  const [currentPage, setCurrentPage] = useState(1)
  const storedIsFetching = itemsStore(state =>state.isFetching)
  const storedItems = itemsStore(state =>state.items)
  const storedTotalPages = itemsStore(state => state.totalPages)
  const storedGetCharactersByName = itemsStore(state => state.getCharactersByName)

  useEffect(() => {
    storedGetCharactersByName(transformedCharName, currentPage)
  }, [transformedCharName, currentPage])

  if(storedIsFetching) return <p>Loading...</p>

  return (
		<main>
			{!!!storedItems.length 
        ? <p>Such character is not yet appeared!</p> 
        : <>
          <List 
            {...{
              items: storedItems
            }}
          />

          <Pagination
						{...{
							setCurrentPage,
							totalPages: storedTotalPages,
							currentPage,
						}}
					/>
        </>
      }
		</main>
	)
}

export default Content
