import { create } from 'zustand';
import { MedicationLog, medsApi } from '../data/meds.api';

type MedsState = {
  logs: MedicationLog[];
  loading: boolean;
  fetchLogs: () => Promise<void>;
  addLog: (log: Omit<MedicationLog, 'id'>) => Promise<void>;
  removeLog: (id: string) => Promise<void>;
};

export const useMedsStore = create<MedsState>((set, get) => ({
  logs: [],
  loading: false,

  fetchLogs: async () => {
    set({ loading: true });
    try {
      const data = await medsApi.list();
      set({ logs: data });
    } finally {
      set({ loading: false });
    }
  },

  addLog: async (payload) => {
    const added = await medsApi.add(payload);
    set({ logs: [added, ...get().logs] });
  },

  removeLog: async (id) => {
    await medsApi.remove(id);
    set({ logs: get().logs.filter((l) => l.id !== id) });
  },
}));
