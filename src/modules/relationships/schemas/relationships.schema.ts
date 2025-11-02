
import { z } from 'zod';

export const RelationshipLinkSchema = z.object({
  userId: z.string(),
  personId: z.string(),
  type: z.string(), // Consider using z.enum() for specific types
  isGuardian: z.boolean().optional(),
  canView: z.boolean().optional(),
  canEdit: z.boolean().optional(),
});

export type RelationshipLinkData = z.infer<typeof RelationshipLinkSchema>;
