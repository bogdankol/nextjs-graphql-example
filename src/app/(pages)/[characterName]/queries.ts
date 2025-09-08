export const amountOfPagesToFetchQueryStr = `
  query {
    characters {
      info {
        pages
      }
    }
  }
`

export const getNamesByPageNum = `
  query ($pageNum: Int!){
    characters (page: $pageNum) {
      results {
        name
      }
    }
  }

`