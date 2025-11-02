
import { http } from '@/lib/http';
import { CreateMedicationLogData, MedicationLogSchema } from '../schemas/medication-logs.schema';
import { z } from 'zod';

const MedicationLogListSchema = z.array(MedicationLogSchema);

const create = async (data: CreateMedicationLogData) => {
  try {
    const response = await http.post('/medication-logs', data);
    const parsed = MedicationLogSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Create medication log error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Create medication log failed');
  }
};

const getByPersonId = async (personId: string) => {
  try {
    const response = await http.get(`/persons/${personId}/medication-logs`);
    const parsed = MedicationLogListSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Get medication logs by person id error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Get medication logs by person id failed');
  }
};

export const medicationLogsApi = {
  create,
  getByPersonId,
};
