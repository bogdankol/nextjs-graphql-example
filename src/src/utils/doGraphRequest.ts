import { useClientContext } from '@/hooks/useClientContext';
import { gql } from '@apollo/client';

export async function doGraphRequest(queryStr: string) {
  const { client } = useClientContext()
  if(!client) throw new Error('No GraphQL client!')

  try {
    const result = await client.query({
      query: gql(queryStr)
    })
    return result

  } catch(err: unknown) {
    if(err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error(`ERROR: ${err}`)
    }
  }
}