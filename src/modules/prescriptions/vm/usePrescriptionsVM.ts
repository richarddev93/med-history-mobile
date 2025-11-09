
import { create } from 'zustand';
import { prescriptionsApi } from '../data/prescriptions.api';
import { attachmentsApi } from '../../attachments/data/attachments.api';
import { Prescription } from '../schemas/prescriptions.schema';

interface PrescriptionsState {
  prescriptions: Prescription[];
  prescription: Prescription | null;
  loading: boolean;
  error: string | null;
  getAll: () => Promise<void>;
  create: (data: {
    personId: string;
    items: any[];
    attachments: any[];
  }) => Promise<void>;
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
    } catch (error: any) {
      const errorMessage = error.message || 'Falha ao carregar prescrições.';
      set({ loading: false, error: errorMessage });
    }
  },

  create: async ({ personId, items, attachments }) => {
    set({ loading: true, error: null });
    try {
      const newPrescription = await prescriptionsApi.create({ personId });

      let updatedPrescription = newPrescription;
      if (items?.length > 0) {
        for (const item of items) {
          updatedPrescription = await prescriptionsApi.addItem(newPrescription.id, item);
        }
      }

      if (attachments?.length > 0) {
        await Promise.all(
          attachments.map((attachment) =>
            attachmentsApi.create(personId, attachment)
          )
        );
      }

      set((state) => ({
        prescriptions: [...state.prescriptions, updatedPrescription],
        loading: false,
      }));
    } catch (error: any) {
      const errorMessage = error.message || 'Falha ao criar prescrição.';
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  getById: async (id: string) => {
    set({ loading: true, error: null, prescription: null });
    try {
      const prescription = await prescriptionsApi.getById(id);
      set({ prescription, loading: false });
    } catch (error: any) {
      const errorMessage = error.message || 'Falha ao buscar detalhes da prescrição.';
      set({ loading: false, error: errorMessage });
    }
  },

  addItem: async (prescriptionId, item) => {
    set({ loading: true, error: null });
    try {
      const updatedPrescription = await prescriptionsApi.addItem(prescriptionId, item);
      set({ prescription: updatedPrescription, loading: false });
    } catch (error: any) {
      const errorMessage = error.message || 'Falha ao adicionar item à prescrição.';
      set({ loading: false, error: errorMessage });
    }
  },
}));
