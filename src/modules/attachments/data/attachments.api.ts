
import { http } from '../../../lib/http';
import { PresignPayloadSchema, PresignResponseSchema, ConfirmPayloadSchema } from './attachments.schema';

export const attachmentsApi = {
  presign: async (payload: any) => {
    const response = await http.post('/attachments/presign', payload);
    const parsed = PresignResponseSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new Error('Failed to parse presign response');
    }
    return parsed.data;
  },
  confirm: async (payload: any) => {
    await http.post('/attachments/confirm', payload);
  },
};
