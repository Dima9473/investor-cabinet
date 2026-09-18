import { z } from 'zod';

/** Сообщение диалога — только роли user и assistant */
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
});
