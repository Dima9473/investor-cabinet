import { z } from 'zod';
import { portfolioAnalysisApiResponseSchema } from 'zodSchemas/analysis/portfolioAnalysisApiResponse';
import { portfolioAnalysisRequestSchema } from 'zodSchemas/analysis/portfolioAnalysisRequest';
import { portfolioAnalysisResponseSchema } from 'zodSchemas/analysis/portfolioAnalysisResponse';

export type PortfolioAnalysisRequestBody = z.infer<
  typeof portfolioAnalysisRequestSchema
>;

export type PortfolioAnalysisResponse = z.infer<
  typeof portfolioAnalysisResponseSchema
>;

export type PortfolioAnalysisApiResponse = z.infer<
  typeof portfolioAnalysisApiResponseSchema
>;
