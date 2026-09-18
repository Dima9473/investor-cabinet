import { z } from 'zod';

/** Ответ POST /chat (без стриминга) */
export const chatResponseSchema = z.object({
  message: z.object({
    role: z.literal('assistant'),
    content: z.string(),
  }),
  model: z.string().optional(),
  portfolioContextUsed: z.boolean(),
});
