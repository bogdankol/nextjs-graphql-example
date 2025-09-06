'use client'
import { create } from 'zustand'
import { TItem } from '@/lib/types'
import { doGraphRequest } from '@/utils/doRequest'

type TItemsStore = {
	items: TItem[]
	isFetching: boolean
	totalPages: number
	getBasicListOfCharacters: (pageNum: number) => void
	getCharactersByName: (name: string, pageNum: number) => void
}

export const itemsStore = create<TItemsStore>(set => ({
	items: [],
	isFetching: false,
	totalPages: 0,
	getBasicListOfCharacters: async (pageNum: number) => {
		set(_ => ({ isFetching: true, items: [] }))

		const res = await doGraphRequest({ pageNum })

		if (res?.items && res?.totalPages) {
			set(_ => ({
				items: res.items,
				totalPages: res.totalPages,
				isFetching: false,
			}))
		} else {
      set(_ => ({ isFetching: false }))
    }
	},
	getCharactersByName: async (name: string, pageNum: number) => {
		set(_ => ({ isFetching: true, items: [] }))

		const res = await doGraphRequest({ pageNum, debouncedValue: name })

		if (res?.items && res?.totalPages) {
			set(_ => ({
				items: res.items,
				totalPages: res.totalPages,
				isFetching: false,
			}))
		} else {
      set(_ => ({ isFetching: false }))
    }
	},
}))
