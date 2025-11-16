import { RelationshipTypeEnum } from '@/modules/peoples/constants/person.enum';
import { z } from 'zod'

export const CreatePersonSchema = z.object({
  fullName: z.string().min(2, 'Nome muito curto'),
  birthDate: z.string().optional(),
  document: z.string().optional(),
  notes: z.string().optional()
})

export const CreateUserPersonLinkSchema = z.object({
  personId: z.string().optional(),
  type: z.coerce.string<RelationshipTypeEnum>(),
  isGuardian: z.boolean().optional(),
});

export const PersonSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  birthDate: z.string().nullable().optional(),
  document: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const PersonListSchema = z.array(PersonSchema)

export type CreatePersonData = z.infer<typeof CreatePersonSchema>
export type CreateUserPersonLinkData = z.infer<typeof CreateUserPersonLinkSchema>
export type Person = z.infer<typeof PersonSchema>
