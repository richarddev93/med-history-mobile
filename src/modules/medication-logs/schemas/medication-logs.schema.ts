
import { z } from 'zod';

export const MedicationLogSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  name: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  doseValue: z.number().optional(),
  doseUnit: z.string().optional(),
  frequencyEvery: z.number().optional(),
  frequencyUnit: z.string().optional(),
  route: z.string().optional(),
  notes: z.string().optional(),
});

export const CreateMedicationLogSchema = z.object({
  patientId: z.string(),
  name: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  doseValue: z.number().optional(),
  doseUnit: z.string().optional(),
  frequencyEvery: z.number().optional(),
  frequencyUnit: z.string().optional(),
  route: z.string().optional(),
  notes: z.string().optional(),
});

export type MedicationLog = z.infer<typeof MedicationLogSchema>;
export type CreateMedicationLogData = z.infer<typeof CreateMedicationLogSchema>;
