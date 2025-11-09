
import { z } from 'zod';

export const CreateMedicationSchema = z.object({
  name: z.string(),
  doseValue: z.number().optional(),
  doseUnit: z.string().optional(),
  frequencyEvery: z.number().optional(),
  frequencyUnit: z.string().optional(),
  route: z.string().optional(),
  durationDays: z.number().optional(),
  instructions: z.string().optional(),
});

export type CreateMedication = z.infer<typeof CreateMedicationSchema>;

export const MedicationSchema = CreateMedicationSchema.extend({
  id: z.string(),
  personId: z.string(),
});

export const MedicationListSchema = z.array(MedicationSchema);
