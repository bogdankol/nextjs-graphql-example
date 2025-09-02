export const getBasicListOfCharacters = `
  query getBasicListOfCharacters ($page: Int!) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        status
        location {
          name
          dimension
          created
        }
        created
        image
      }
    }
  }
`

export const getCharactersByName = `
  query GetCharactersByName ($name: String!, $page: Int!) {
    characters(filter: { name: $name }, page: $page) {
      info {
        pages
      }
      results {
        id
        name
        status
        image
        location {
          dimension
          created
          name
        }
      }
    }
  }
`
