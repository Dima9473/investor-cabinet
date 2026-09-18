import { z } from 'zod';

import { portfolioAnalysisResponseSchema } from './portfolioAnalysisResponse';

const portfolioMetricsSchema = z.object({
  period: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  }),
  summary: z.object({
    totalOperations: z.number(),
    netFlowByCurrency: z.record(z.number()),
    byInstrumentType: z.record(z.number()),
    byOperationType: z.record(z.number()),
  }),
});

/** Полный ответ POST /analysis/portfolio/:bankName */
export const portfolioAnalysisApiResponseSchema = z.object({
  bankName: z.string(),
  period: portfolioMetricsSchema.shape.period,
  metrics: portfolioMetricsSchema,
  analysis: portfolioAnalysisResponseSchema,
});
