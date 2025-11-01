
import { create } from 'zustand';
import { attachmentsApi } from '../data/attachments.api';
import * as DocumentPicker from 'expo-document-picker';

interface AttachmentsState {
  attachments: any[];
  loading: boolean;
  error: string | null;
  uploadAttachment: () => Promise<void>;
}

export const useAttachmentsVM = create<AttachmentsState>((set) => ({
  attachments: [],
  loading: false,
  error: null,
  uploadAttachment: async () => {
    set({ loading: true, error: null });
    try {
      const doc = await DocumentPicker.getDocumentAsync();

      if (doc.canceled === false) {

        const presignPayload = { filename: doc.assets[0].name, mimetype: doc.assets[0].mimeType, size: doc.assets[0].size };
  
        const { url, attachmentId } = await attachmentsApi.presign(presignPayload);
  
        const uploadResponse = await fetch(url, {
          method: 'PUT',
          body: doc.assets[0],
          headers: {
            'Content-Type': doc.assets[0].mimeType,
          },
        });
  
        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }
  
        await attachmentsApi.confirm({ attachmentId });
  
        // TODO: Refresh attachment list
      }

      set({ loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to upload attachment' });
    }
  },
}));
