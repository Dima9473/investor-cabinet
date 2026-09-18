import { z } from 'zod';

import { chatMessageSchema } from './chatMessage';

export const chatPortfolioContextSchema = z.object({
  bankName: z.string().min(1),
  accountId: z.string().min(1),
  from: z.string().optional(),
  to: z.string().optional(),
});

/** Тело POST /chat и POST /chat/stream */
export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(30),
  portfolioContext: chatPortfolioContextSchema.optional(),
});
