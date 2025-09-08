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

  setItems: (arr: TItem[]) => void
  setIsFetching: (value: boolean) => void
  setTotalPages: (num: number) => void
}

export const itemsStore = create<TItemsStore>(set => ({
	items: [],
	isFetching: false,
	totalPages: 0,
	getBasicListOfCharacters: async (pageNum: number) => {
		set(_ => ({ isFetching: true }))

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
		set(_ => ({ isFetching: true }))

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

  setItems: (arr: TItem[]) => set({ items: arr }),
  setIsFetching: (value: boolean) => set({ isFetching: value }),
  setTotalPages: (num: number) => set({ totalPages: num })
}))
