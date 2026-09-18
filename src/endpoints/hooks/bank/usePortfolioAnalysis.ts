import { useMutation } from '@tanstack/react-query';

import { fetchPortfolioAnalysis } from '../../lib/fetchPortfolioAnalysis';

import {
  PortfolioAnalysisApiResponse,
  PortfolioAnalysisRequestBody,
} from '../../model/types/analysis/portfolioAnalysis';

type AnalyzePortfolioVariables = PortfolioAnalysisRequestBody & {
  bankName: string;
};

/** Ручной запуск LLM-анализа (долгий запрос, без автоповтора) */
export const usePortfolioAnalysis = () =>
  useMutation<PortfolioAnalysisApiResponse, Error, AnalyzePortfolioVariables>({
    mutationFn: ({ bankName, ...body }) =>
      fetchPortfolioAnalysis(bankName, body),
    retry: false,
  });
