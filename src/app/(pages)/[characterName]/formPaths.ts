import { amountOfPagesToFetchQueryStr, getNamesByPageNum } from './queries'

export async function formPaths() {

  const amountOfPagesToFetch = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: { "Content-Type": 'application/json'},
    body: JSON.stringify({
      query: amountOfPagesToFetchQueryStr
    })
  })

  const res = await amountOfPagesToFetch.json()
  const arrOfPageNumbers: number[] = []
  const arrOfTransformedCharNames: string[] = []

  if (res?.data?.characters.info) {
    const lastPage = res?.data?.characters.info.pages

    for(let i = 1; i <= lastPage; i +=1) {
      arrOfPageNumbers.push(i)
    }
  }

  if(arrOfPageNumbers.length > 0) {
    for (const num of arrOfPageNumbers) {
      const res = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify({
          query: getNamesByPageNum,
          variables: {
            pageNum: num
          }
        })
      })

      const resp = await res.json()

      if(resp?.data?.characters) {
        for(const charName of resp?.data?.characters.results) {
          arrOfTransformedCharNames.push(charName.name.toLowerCase().split(' ').join('-'))
        }
      }
    }
  }
  
  const paths = arrOfTransformedCharNames.map(name => ({
    characterName: name
  }))

  return paths
  
}