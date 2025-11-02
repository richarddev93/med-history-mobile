
import { http } from '@/lib/http';
import { RelationshipLinkData } from '../schemas/relationships.schema';

const link = async (data: RelationshipLinkData) => {
  try {
    const response = await http.post('/relationships/link', data);
    return response.data;
  } catch (error: any) {
    console.error('Link error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Link failed');
  }
};

export const relationshipsApi = {
  link,
};
