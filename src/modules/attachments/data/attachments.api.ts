const remove = async (id: string) => {
  try {
    await http.delete(`/api/attachments/${id}`);
    return true;
  } catch (error: any) {
    console.error('Delete attachment error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Delete attachment failed');
  }
};

import { api } from '@/lib/api';
import { AttachmentListSchema, AttachmentSchema } from '../schemas/attachments.schema';

import { http } from '@/lib/http';

const listByEncounter = async (encounterId: string) => {
  const response = await http.get(`/api/attachments/list/encounter/${encounterId}`);
  return response.data;
};

const presign = async (userId: string, data: any) => {
  const response = await http.post(`/api/attachments/presign/${userId}`, data);
  return response.data;
};

const confirm = async (userId: string, data: any) => {
  const response = await http.post(`/api/attachments/confirm/${userId}`, data);
  return response.data;
};

const listPending = async (params: any) => {
  const response = await http.get('/api/attachments/list/pending', { params });
  return response.data;
};

export const attachmentsApi = {
  listByEncounter,
  presign,
  confirm,
  listPending,
  remove,
};
