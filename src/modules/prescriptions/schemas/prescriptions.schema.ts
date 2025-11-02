
import { z } from 'zod';

export const PrescriptionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  doseValue: z.number().optional(),
  doseUnit: z.string().optional(),
  frequencyEvery: z.number().optional(),
  frequencyUnit: z.string().optional(),
  route: z.string().optional(),
  notes: z.string().optional(),
});

export const PrescriptionSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  items: z.array(PrescriptionItemSchema).optional(),
});

export const CreatePrescriptionSchema = z.object({
  patientId: z.string(),
});

export const AddPrescriptionItemSchema = z.object({
  name: z.string(),
  doseValue: z.number().optional(),
  doseUnit: z.string().optional(),
  frequencyEvery: z.number().optional(),
  frequencyUnit: z.string().optional(),
  route: z.string().optional(),
  notes: z.string().optional(),
});

export type Prescription = z.infer<typeof PrescriptionSchema>;
export type CreatePrescriptionData = z.infer<typeof CreatePrescriptionSchema>;
export type AddPrescriptionItemData = z.infer<typeof AddPrescriptionItemSchema>;
