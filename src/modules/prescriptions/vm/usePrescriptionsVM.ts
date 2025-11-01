
import { create } from 'zustand';
import { prescriptionsApi } from '../data/prescriptions.api';

interface PrescriptionsState {
  prescriptions: any[];
  prescription: any | null;
  loading: boolean;
  error: string | null;
  getAll: () => Promise<void>;
  create: (data: any) => Promise<void>;
  getById: (id: string) => Promise<void>;
  addItem: (prescriptionId: string, item: any) => Promise<void>;
}

export const usePrescriptionsVM = create<PrescriptionsState>((set) => ({
  prescriptions: [],
  prescription: null,
  loading: false,
  error: null,
  getAll: async () => {
    set({ loading: true, error: null });
    try {
      const prescriptions = await prescriptionsApi.getAll();
      set({ prescriptions, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch prescriptions' });
    }
  },
  create: async (data) => {
    set({ loading: true, error: null });
    try {
      await prescriptionsApi.create(data);
      const prescriptions = await prescriptionsApi.getAll();
      set({ prescriptions, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to create prescription' });
    }
  },
  getById: async (id) => {
    set({ loading: true, error: null, prescription: null });
    try {
      const prescription = await prescriptionsApi.getById(id);
      set({ prescription, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch prescription' });
    }
  },
  addItem: async (prescriptionId, item) => {
    set({ loading: true, error: null });
    try {
      await prescriptionsApi.addItem(prescriptionId, item);
      const prescription = await prescriptionsApi.getById(prescriptionId);
      set({ prescription, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to add item to prescription' });
    }
  },
}));
