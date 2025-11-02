
import { api } from '@/lib/api';
import { AttachmentListSchema, AttachmentSchema } from '../schemas/attachments.schema';

const getAllByPerson = async (personId: string) => {
  const response = await api.get(`/persons/${personId}/attachments`);
  return AttachmentListSchema.parse(response.data);
};

const create = async (personId: string, file: any) => {
  const formData = new FormData();

  formData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.mimeType || 'application/octet-stream',
  } as any);

  const response = await api.post(`/persons/${personId}/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return AttachmentSchema.parse(response.data);
};

const remove = async (attachmentId: string) => {
  await api.delete(`/attachments/${attachmentId}`);
};

export const attachmentsApi = {
  getAllByPerson,
  create,
  remove,
};
