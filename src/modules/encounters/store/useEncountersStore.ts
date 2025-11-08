import { create } from 'zustand'
import { Encounter } from '../schemas/encounters.schema'


type EncounterState = {
  encounters: Encounter[]
  loading: boolean
  setEncounters: (encounters: Encounter[]) => void
  setLoading: (loading: boolean) => void
}

export const useEncounterStore = create<EncounterState>((set) => ({
  encounters: [],
  loading: false,

  setEncounters: (encounters: Encounter[]) => set({ encounters }),
  setLoading: (loading: boolean) => set({ loading }),
}))
