
import { http } from '@/lib/http';
import {
  CreatePersonData,
  CreatePersonSchema,
  PersonListSchema,
  PersonSchema,
} from '@/schemas/peoples.schema';


const ENDPOINT = 'v1/person'
export const peoplesApi = {
  async getAll() {
    try {
      const response = await http.get(ENDPOINT);
      console.log('Response data:', ENDPOINT, response.data);      
      const parsed = PersonListSchema.safeParse(response.data);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Formato inesperado da resposta do servidor');
      }

      return parsed.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Erro ao listar pessoas:', error.message);
      throw new Error('Falha ao buscar pessoas');
    }
  },

  async getById(id: string) {
    try {
      const response = await http.get(`${ENDPOINT}/${id}`);
      const parsed = PersonSchema.safeParse(response.data);

      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Formato inesperado da resposta do servidor');
      }

      return parsed.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Erro ao buscar pessoa:', error.message);
      throw new Error('Falha ao buscar pessoa');
    }
  },

  async create(data: CreatePersonData) {
    try {
      const body = CreatePersonSchema.parse(data);
      const response = await http.post(ENDPOINT, body);
      const parsed = PersonSchema.safeParse(response.data);

      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Formato inesperado da resposta do servidor');
      }

      return parsed.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Erro ao criar pessoa:', error.message);
      throw new Error('Falha ao criar pessoa');
    }
  },
  async delete(id: string) {
    try {
      await http.delete(`${ENDPOINT}/${id}`);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) console.error('Erro ao deletar pessoa:', error.message);
      throw new Error('Falha ao deletar pessoa');
    }
  },
};
