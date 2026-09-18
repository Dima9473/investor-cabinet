import { PortfolioAnalysisRequestBody } from 'endpoints/model/types/analysis/portfolioAnalysis';
import { OperationsRequest } from 'endpoints/model/types/bank/requests/operationsRequest';

/** Сериализация тела для LLM-анализа: даты → ISO, без bankName в body */
export const toPortfolioAnalysisBody = (
  params: OperationsRequest & { accountId: string },
): PortfolioAnalysisRequestBody => ({
  accountId: params.accountId,
  from: params.from?.toISOString(),
  to: params.to?.toISOString(),
  state: params.state,
  figi: params.figi,
});
