
import { z } from 'zod';

export const CreateMedicationSchema = z.object({
  name: z.string(),
  doseValue: z.number(),
  doseUnit: z.string(),
  frequencyEvery: z.number(),
  frequencyUnit: z.string(),
  route: z.string(),
  durationDays: z.number().optional(),
  instructions: z.string().optional(),
});

export type CreateMedication = z.infer<typeof CreateMedicationSchema>;

export const MedicationSchema = CreateMedicationSchema.extend({
  id: z.string(),
  personId: z.string(),
});

export const MedicationListSchema = z.array(MedicationSchema);
