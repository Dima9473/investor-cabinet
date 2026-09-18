import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { streamChatCompletion } from 'endpoints/lib/streamChatCompletion';
import { useCallback, useRef, useState } from 'react';
import { useStore } from 'store/useStore';

import { toChatPortfolioContext } from 'entities/bank/lib/toChatPortfolioContext';

import { ChatMessage } from 'endpoints/model/types/chat/chat';

const CHAT_DISCLAIMER =
  'Ответы ИИ носят информационный характер и не являются индивидуальной инвестиционной рекомендацией.';

export const useInvestmentChat = () => {
  const { account, bankId, from, to } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usePortfolioContext, setUsePortfolioContext] = useState(true);
  const [portfolioContextUsed, setPortfolioContextUsed] = useState(false);
  const abortRef = useRef(false);

  const canUsePortfolio =
    usePortfolioContext &&
    isBankAbailable(bankId) &&
    Boolean(account?.id);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();

      if (!trimmed || isLoading) {
        return;
      }

      abortRef.current = false;
      setError(null);
      setIsLoading(true);
      setPortfolioContextUsed(false);

      const userMessage: ChatMessage = { role: 'user', content: trimmed };
      const history = [...messages, userMessage];

      setMessages([...history, { role: 'assistant', content: '' }]);

      const assistantIndex = history.length;

      try {
        const portfolioContext =
          canUsePortfolio && account
            ? toChatPortfolioContext({
                bankId,
                accountId: account.id,
                from,
                to,
              })
            : undefined;

        const fullText = await streamChatCompletion(
          { messages: history, portfolioContext },
          (event) => {
            if (abortRef.current) {
              return;
            }

            if (event.type === 'portfolioContextUsed') {
              setPortfolioContextUsed(true);
            }

            if (event.type === 'delta') {
              setMessages((prev) => {
                const next = [...prev];
                const current = next[assistantIndex];

                if (!current || current.role !== 'assistant') {
                  return prev;
                }

                next[assistantIndex] = {
                  role: 'assistant',
                  content: current.content + event.value,
                };

                return next;
              });
            }
          },
        );

        if (!fullText.trim()) {
          throw new Error('Пустой ответ ассистента');
        }

        setMessages((prev) => {
          const next = [...prev];
          next[assistantIndex] = { role: 'assistant', content: fullText };

          return next;
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ошибка чата с ИИ';

        setError(message);
        setMessages(history);
      } finally {
        setIsLoading(false);
      }
    },
    [
      account,
      bankId,
      canUsePortfolio,
      from,
      isLoading,
      messages,
      to,
    ],
  );

  const clearChat = useCallback(() => {
    abortRef.current = true;
    setMessages([]);
    setError(null);
    setPortfolioContextUsed(false);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    usePortfolioContext,
    setUsePortfolioContext,
    portfolioContextUsed,
    canUsePortfolio,
    hasAccount: Boolean(account?.id),
    disclaimer: CHAT_DISCLAIMER,
  };
};
