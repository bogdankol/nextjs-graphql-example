'use client'
import Card from '@/components/Card'
import { useGraphRequestByQueryString } from '@/hooks/useGraphRequestByQueryString'
import { TRespData } from '@/lib/types'

function Content({ transformedCharName }: { transformedCharName: string }) {
	const { data, loading }: TRespData = useGraphRequestByQueryString({
		fullNameString: transformedCharName,
	})

  if(loading) return <p>Loading...</p>

  return (
		<main>
			{!!!data?.characters?.results.length 
        ? <p>Such character is not yet appeared!</p> 
        : <>
          <Card {...{item: data?.characters?.results[0]}} />
        </>
      }
		</main>
	)
}

export default Content
