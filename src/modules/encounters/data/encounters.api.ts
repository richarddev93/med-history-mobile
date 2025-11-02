
import { http } from '@/lib/http';
import { CreateEncounterData, EncounterSchema } from '../schemas/encounters.schema';
import { z } from 'zod';

const EncounterListSchema = z.array(EncounterSchema);

const create = async (data: CreateEncounterData) => {
  try {
    const response = await http.post('/encounters', data);
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
    const response = await http.get(`/persons/${personId}/encounters`);
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
  create,
  getByPersonId,
};
