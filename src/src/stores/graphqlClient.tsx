'use client'
import initApolloClient from '@/utils/initApolloClient'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { createContext, ReactNode, useEffect, useState } from 'react'

type TClientContext = {
	client: ApolloClient<NormalizedCacheObject> | null
}

export const ClientContext = createContext<TClientContext | null>(null)

export default function ClientContextProvider({
	children,
  data
}: {
	children: ReactNode
  data: ApolloClient<NormalizedCacheObject>
}) {
	const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)

  useEffect(() => {
    setClient(data)
  }, [data])

  console.log({client})

	return (
		<ClientContext.Provider
			value={{
				client
			}}
		>
			{children}
		</ClientContext.Provider>
	)
}
