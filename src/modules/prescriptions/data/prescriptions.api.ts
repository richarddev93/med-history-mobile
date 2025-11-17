
import { http } from '../../../lib/http';
import {
  AddPrescriptionItemData,
  CreatePrescriptionData,
  PrescriptionSchema,
} from '../schemas/prescriptions.schema';
import { z } from 'zod';

const PrescriptionListSchema = z.array(PrescriptionSchema);

const getAll = async () => {
  try {
    const response = await http.get('/prescriptions');
    const parsed = PrescriptionListSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error('Erro de Zod em getAll:', parsed.error);
      throw new Error('Formato inesperado da resposta do servidor ao buscar prescrições.');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Erro em getAll prescrições:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar prescrições.');
  }
};

const getByPersonId = async (personId: string) => {
  try {
    const response = await http.get(`/persons/${personId}/prescriptions`);
    const parsed = PrescriptionListSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error('Erro de Zod em getByPersonId:', parsed.error);
      throw new Error('Formato inesperado da resposta do servidor.');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Erro em getByPersonId:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar prescrições por pessoa.');
  }
};

const create = async (data: CreatePrescriptionData) => {
  try {
    const response = await http.post('/prescriptions', data);
    const parsed = PrescriptionSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error('Erro de Zod em create:', parsed.error);
      throw new Error('Formato inesperado da resposta do servidor ao criar prescrição.');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Erro ao criar prescrição:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao criar prescrição.');
  }
};

const getById = async (id: string) => {
  try {
    const response = await http.get(`/v1/prescriptions/${id}`);
    const parsed = PrescriptionSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error('Erro de Zod em getById:', parsed.error);
      throw new Error('Formato inesperado da resposta do servidor ao buscar prescrição.');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Erro em getById:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar prescrição.');
  }
};

const addItem = async (prescriptionId: string, items: AddPrescriptionItemData[]) => {
  try {
    const response = await http.post(`/v1/prescriptions/${prescriptionId}/items`, items);
    if (!response.status || response.status < 200 || response.status >= 300) {
      throw new Error('Resposta vazia ao adicionar item à prescrição.');
    }
    // const parsed = PrescriptionSchema.safeParse(response.data);
    // if (!parsed.success) {
    //   console.error('Erro de Zod em addItem:', parsed.error);
    //   throw new Error('Formato inesperado da resposta do servidor ao adicionar item.');
    // }
    return response.data;
  } catch (error: any) {
    console.error('Erro ao adicionar item à prescrição:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao adicionar item à prescrição.');
  }
};

const remove = async (id: string) => {
    try {
      await http.delete(`/v1/prescriptions/${id}`);
      return true;
    } catch (error: any) {
      console.error('Delete prescription error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Delete prescription failed');
    }
  };

export const prescriptionsApi = {
  getAll,
  getByPersonId,
  create,
  getById,
  addItem,
  remove,
};
