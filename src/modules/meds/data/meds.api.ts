import { http } from '@/lib/http';
export type MedicationLog = { id: string; drug: string; dose: string; takenAt: string; status: 'taken' | 'missed' };

export const medsApi = {
  list: async (): Promise<MedicationLog[]> => (await http.get('/meds/logs')).data,
  add: async (payload: Omit<MedicationLog, 'id'>): Promise<MedicationLog> => (await http.post('/meds/logs', payload)).data,
  remove: async (id: string): Promise<void> => { await http.delete(`/meds/logs/${id}`); },
};
