
import { z } from 'zod';

export const AttachmentSchema = z.object({
  id: z.string(),
  personId: z.string(),
  fileName: z.string(),
  fileUrl: z.string(),
  fileType: z.string(),
  createdAt: z.string(),
});

export const AttachmentListSchema = z.array(AttachmentSchema);

export type Attachment = z.infer<typeof AttachmentSchema>;
