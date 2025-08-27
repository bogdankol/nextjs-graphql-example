export const getBasicListOfCharacters = `
  query {
    characters {
      results {
        name
        status
        location {
          name
          created
        }
        created
        image
      }
    }
  }
`