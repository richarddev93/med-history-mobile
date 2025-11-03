
import { http } from '../../../lib/http';
import { CreateMedication, CreateMedicationSchema, MedicationListSchema, MedicationSchema } from '../schemas/medications.schema';


export const medicationsApi = {
  getAllByPerson: async (personId: string) => {
    try {
      const response = await http.get(`/persons/${personId}/medications`);
      const parsed = MedicationListSchema.safeParse(response.data);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Formato inesperado da resposta do servidor');
      }
      return parsed.data;
    } catch (error: any) {
      console.error('Get all by person error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Get all by person failed');
    }
  },
  create: async (medication: CreateMedication) => {
    try {
      const body = CreateMedicationSchema.parse(medication);
      const response = await http.post('/medications', body);
      const parsed = MedicationSchema.safeParse(response.data);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Formato inesperado da resposta do servidor');
      }
      return parsed.data;
    } catch (error: any) {
      console.error('Create medication error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Create medication failed');
    }
  },
};
