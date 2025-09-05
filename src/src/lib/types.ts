export type TItem = {
	name: string
	status: string
  id: any
	location: {
		name: string
		created: string
		dimension: string
	}
	created: string
	image: string
}

export type TResData = {
	data: {
		characters: {
			info: {
				pages: number
			}
		}
	}
}

export type TResultsData = {
  data: {
		characters: {
			results: TItem[]
		}
	}
}

export type TRespData = TResData & TResultsData & {
  loading: boolean
}
