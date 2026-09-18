import { z } from 'zod';

/** Текстовый блок от GigaChat — структура совпадает с middleware */
export const portfolioAnalysisResponseSchema = z.object({
  summary: z.string(),
  risks: z.array(z.string()),
  diversification: z.string(),
  observations: z.array(z.string()),
  disclaimer: z.string(),
});
