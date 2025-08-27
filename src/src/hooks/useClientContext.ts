import { useContext } from 'react'
import { ClientContext } from '@/stores/graphqlClient'

export function useClientContext() {
  const context = useContext(ClientContext)

  if(!context) throw new Error('ClientContext is not initialized')

  return context
}