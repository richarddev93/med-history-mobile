
import { create } from 'zustand';
import { medicationsApi } from '../data/medications.api';
import { CreateMedication, Medication } from '../schemas/medications.schema';

interface MedicationsState {
  medications: Medication[];
  loading: boolean;
  error: string | null;
  getAllByPerson: (personId: string) => Promise<void>;
  createMedication: (medication: CreateMedication) => Promise<void>;
}

export const useMedicationsVM = create<MedicationsState>((set) => ({
  medications: [],
  loading: false,
  error: null,
  getAllByPerson: async (personId) => {
    set({ loading: true, error: null });
    try {
      const medications = await medicationsApi.getAllByPerson(personId);
      set({ medications, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch medications' });
    }
  },
  createMedication: async (medication) => {
    set({ loading: true, error: null });
    try {
      await medicationsApi.create(medication);
      set({ loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to create medication' });
    }
  },
}));
