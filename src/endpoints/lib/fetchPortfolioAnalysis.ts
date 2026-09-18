import { portfolioAnalysisApiResponseSchema } from 'zodSchemas/analysis/portfolioAnalysisApiResponse';

import { CLUSTERS } from './constants/clasters';

import {
  PortfolioAnalysisApiResponse,
  PortfolioAnalysisRequestBody,
} from 'endpoints/model/types/analysis/portfolioAnalysis';

/**
 * Запрос к middleware — GigaChat вызывается только на сервере.
 * Ключи и сырые операции не попадают на клиент.
 */
export const fetchPortfolioAnalysis = async (
  bankName: string,
  body: PortfolioAnalysisRequestBody,
): Promise<PortfolioAnalysisApiResponse> => {
  const response = await fetch(
    `${CLUSTERS.BANKS}/analysis/portfolio/${bankName}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP ${response.status}`);
  }

  const json: unknown = await response.json();

  return portfolioAnalysisApiResponseSchema.parse(json);
};
