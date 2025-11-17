
import { z } from 'zod';

// Allowed encounter types
export const EncounterTypeEnum = z.enum(['EMERGENCY', 'OUTPATIENT']);
export type EncounterType = z.infer<typeof EncounterTypeEnum>;

export const EncounterSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  type: EncounterTypeEnum,
  occurredAt: z.string(),
  reason: z.string().optional(),
  notes: z.string().optional(),
  healthcareProvider: z.string().optional(),
  Prescription: z.array(z.any()).optional(),
});

export const CreateEncounterSchema = z.object({
  patientId: z.string(),
  type: EncounterTypeEnum,
  occurredAt: z.string(),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export type ResponseEncounter = z.infer<typeof EncounterSchema>;

export type Encounter = z.infer<typeof EncounterSchema>;
export type CreateEncounterData = z.infer<typeof CreateEncounterSchema>;
