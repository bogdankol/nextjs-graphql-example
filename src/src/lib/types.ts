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

export type TInfo = {
  pages?: number
}

export type TCharacters = {
  info?: TInfo;
  results?: TItem[];
};

export type TRespData = {
  loading: boolean;
  error?: Error;
  data?: {
    characters: TCharacters;
  };
};

