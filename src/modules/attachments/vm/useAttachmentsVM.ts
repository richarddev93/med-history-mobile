
import { create } from 'zustand';
import { attachmentsApi } from '../data/attachments.api';
import { Attachment } from '../schemas/attachments.schema';

interface AttachmentsState {
  attachments: Attachment[];
  loading: boolean;
  error: string | null;
  getAllByPerson: (personId: string) => Promise<void>;
  createAttachment: (personId: string, file: any) => Promise<void>;
  deleteAttachment: (attachmentId: string) => Promise<void>;
}

export const useAttachmentsVM = create<AttachmentsState>((set, get) => ({
  attachments: [],
  loading: false,
  error: null,
  getAllByPerson: async (personId) => {
    set({ loading: true, error: null });
    try {
      const attachments = await attachmentsApi.getAllByPerson(personId);
      set({ attachments, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch attachments' });
    }
  },
  createAttachment: async (personId, file) => {
    set({ loading: true, error: null });
    try {
      const newAttachment = await attachmentsApi.create(personId, file);
      set((state) => ({
        attachments: [...state.attachments, newAttachment],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to create attachment' });
    }
  },
  deleteAttachment: async (attachmentId) => {
    set({ loading: true, error: null });
    try {
      await attachmentsApi.remove(attachmentId);
      set((state) => ({
        attachments: state.attachments.filter((att) => att.id !== attachmentId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to delete attachment' });
    }
  },
}));
