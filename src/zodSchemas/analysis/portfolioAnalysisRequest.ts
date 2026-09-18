import { z } from 'zod';

/** Тело запроса — те же поля, что у /operations (даты в ISO-строках) */
export const portfolioAnalysisRequestSchema = z.object({
  accountId: z.string().min(1),
  from: z.string().optional(),
  to: z.string().optional(),
  state: z.string().optional(),
  figi: z.string().optional(),
});
