import { getOperationsParams } from 'entities/bank/lib/getOperationsParams';
import { toPortfolioAnalysisBody } from 'entities/bank/lib/toPortfolioAnalysisBody';

import { ChatRequestBody } from 'endpoints/model/types/chat/chat';

type ToChatPortfolioContextParams = {
  bankId: string;
  accountId: string;
  from?: string;
  to?: string;
};

/** Контекст портфеля для чата: accountId остаётся на middleware */
export const toChatPortfolioContext = (
  params: ToChatPortfolioContextParams,
): NonNullable<ChatRequestBody['portfolioContext']> => {
  const operationsParams = getOperationsParams({
    accountId: params.accountId,
    bankName: params.bankId,
    from: params.from,
    to: params.to,
  });
  const body = toPortfolioAnalysisBody(operationsParams);

  return {
    bankName: params.bankId,
    accountId: params.accountId,
    from: body.from,
    to: body.to,
  };
};
