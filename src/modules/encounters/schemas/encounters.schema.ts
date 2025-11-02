
import { z } from 'zod';

export const EncounterSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  type: z.string(),
  occurredAt: z.string(),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export const CreateEncounterSchema = z.object({
  patientId: z.string(),
  type: z.string(),
  occurredAt: z.string(),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export type Encounter = z.infer<typeof EncounterSchema>;
export type CreateEncounterData = z.infer<typeof CreateEncounterSchema>;
