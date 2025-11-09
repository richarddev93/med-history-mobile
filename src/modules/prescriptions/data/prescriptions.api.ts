const remove = async (id: string) => {
  try {
    await http.delete(`/api/v1/prescriptions/${id}`);
    return true;
  } catch (error: any) {
    console.error('Delete prescription error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Delete prescription failed');
  }
};

import { http } from '../../../lib/http';
import {
  AddPrescriptionItemData,
  CreatePrescriptionData,
  PrescriptionSchema,
} from '../schemas/prescriptions.schema';
import { z } from 'zod';

const PrescriptionListSchema = z.array(PrescriptionSchema);

const getByPersonId = async (personId: string) => {
  try {
    const response = await http.get(`/api/v1/person/${personId}/prescriptions`);
    const parsed = PrescriptionListSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Get prescriptions by person id error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Get prescriptions by person id failed');
  }
};

const create = async (data: CreatePrescriptionData) => {
  try {
    const response = await http.post('/api/v1/prescriptions', data);
    const parsed = PrescriptionSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Create prescription error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Create prescription failed');
  }
};

const getById = async (id: string) => {
  try {
    const response = await http.get(`/api/v1/prescriptions/${id}`);
    const parsed = PrescriptionSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Get prescription by id error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Get prescription by id failed');
  }
};

const addItem = async (prescriptionId: string, item: AddPrescriptionItemData) => {
  try {
    const response = await http.post(`/api/v1/prescriptions/${prescriptionId}/items`, item);
    const parsed = PrescriptionSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Add prescription item error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Add prescription item failed');
  }
};

export const prescriptionsApi = {
  getByPersonId,
  create,
  getById,
  addItem,
  remove,
};
