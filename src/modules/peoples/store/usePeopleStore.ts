import { create } from 'zustand'
import { peoplesApi } from '../data/peoples.api'

type Person = {
  id: string
  fullname: string
  birthDate?: string
  document?: string
  notes?: string
}

type PeopleState = {
  list: Person[]
  loading: boolean
  fetchPeople: () => Promise<void>
}

export const usePeopleStore = create<PeopleState>((set) => ({
  list: [],
  loading: false,

  fetchPeople: async () => {
    set({ loading: true })
    const data = await peoplesApi.getAll()
    set({ list: data, loading: false })
  },
}))
