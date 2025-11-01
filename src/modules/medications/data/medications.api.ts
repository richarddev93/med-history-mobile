
import { http } from '../../../lib/http';
import { MedicationListSchema, CreateMedicationSchema } from './medications.schema';

export const medicationsApi = {
  getAllByPerson: async (personId: string) => {
    const response = await http.get(`/persons/${personId}/medication-logs`);
    const parsed = MedicationListSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new Error('Failed to parse medications');
    }
    return parsed.data;
  },
  create: async (medication: any) => {
    const response = await http.post('/medication-logs', medication);
    return response.data;
  },
};
