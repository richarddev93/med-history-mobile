
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
  createAttachment: async (userId, file, encounterId) => {
    set({ loading: true, error: null });
    try {
      // 1. Presign
      const presignData = {
        filename: file.name,
        mimeType: file.mimeType || 'application/octet-stream',
        sizeBytes: file.size,
        scope: 'ENCOUNTER',
        scopeId: encounterId,
      };
      const presignRes = await attachmentsApi.presign(userId, presignData);
      const { url, storageKey } = presignRes;

      // 2. Upload
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.mimeType || 'application/octet-stream',
        },
        body: file.file || file.uri ? { uri: file.uri } : file,
      });
      if (!uploadRes.ok) throw new Error('Upload failed');

      // 3. Confirm
      const confirmData = {
        storageKey,
        filename: file.name,
        mimeType: file.mimeType || 'application/octet-stream',
        sizeBytes: file.size,
        encounterId,
      };
      const confirmed = await attachmentsApi.confirm(userId, confirmData);
      set((state) => ({
        attachments: [...state.attachments, confirmed],
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
