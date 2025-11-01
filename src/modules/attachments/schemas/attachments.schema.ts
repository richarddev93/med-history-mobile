
import { z } from 'zod';

export const OcrStatusSchema = z.enum(['PENDING', 'DONE', 'FAILED']);

export const AttachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  mimetype: z.string(),
  size: z.number(),
  ocrStatus: OcrStatusSchema,
  ocrText: z.string().nullable(),
  url: z.string(),
});

export const AttachmentListSchema = z.array(AttachmentSchema);

export const PresignPayloadSchema = z.object({
  filename: z.string(),
  mimetype: z.string(),
  size: z.number(),
});

export const PresignResponseSchema = z.object({
  url: z.string(),
  attachmentId: z.string(),
});

export const ConfirmPayloadSchema = z.object({
  attachmentId: z.string(),
});
