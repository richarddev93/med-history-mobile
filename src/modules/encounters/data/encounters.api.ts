
import { http } from '@/lib/http';
import { CreateEncounterData, EncounterSchema } from '../schemas/encounters.schema';
import { z } from 'zod';

const EncounterListSchema = z.array(EncounterSchema);

const createEncounter = async (data: CreateEncounterData) => {
  try {
    const response = await http.post('/v1/encounter', data);
    const parsed = EncounterSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Create encounter error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Create encounter failed');
  }
};

const getByPersonId = async (personId: string) => {
  try {
    const response = await http.get(`v1/person/${personId}/encounters`);
    const parsed = EncounterListSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Get encounters by person id error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Get encounters by person id failed');
  }
};

export const encountersApi = {
  createEncounter,
  getByPersonId,
  deleteEncounter: async (id: string) => {
    try {
      await http.delete(`/v1/encounter/${id}`);
      return true;
    } catch (error: any) {
      console.error('Delete encounter error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Delete encounter failed');
    }
  },
};
