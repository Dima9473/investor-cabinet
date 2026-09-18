import SendOutlined from '@mui/icons-material/SendOutlined';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';
import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useStore } from 'store/useStore';

import { Text } from 'shared/ui/Typography/Text/Text';
import { useInvestmentChat } from 'features/Bank/hooks/useInvestmentChat';

import styles from './InvestmentChat.module.css';

/** Чат с ИИ через middleware — ключ GigaChat не попадает в браузер */
export const InvestmentChat = () => {
  const { bankId } = useStore();
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    usePortfolioContext,
    setUsePortfolioContext,
    portfolioContextUsed,
    canUsePortfolio,
    hasAccount,
    disclaimer,
  } = useInvestmentChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const text = draft;

    setDraft('');
    await sendMessage(text);
  };

  const bankReady = isBankAbailable(bankId);

  return (
    <section className={styles.container} aria-label="Чат с ИИ">
      <div className={styles.header}>
        <Text variant="subtitle1">Инвестиционный ассистент</Text>
        <div>
          {!bankReady && (
            <Text variant="caption" color="secondary">
              Выберите банк в панели сверху, чтобы учитывать портфель.
            </Text>
          )}
          {hasAccount && bankReady && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={usePortfolioContext}
                  onChange={(e) => setUsePortfolioContext(e.target.checked)}
                  disabled={isLoading}
                />
              }
              label="Учитывать портфель"
            />
          )}
          <Button
            size="small"
            onClick={clearChat}
            disabled={isLoading || messages.length === 0}
          >
            Очистить
          </Button>
        </div>
      </div>

      {portfolioContextUsed && (
        <Text variant="caption" color="secondary">
          В ответ подмешаны агрегированные метрики портфеля (без ID и FIGI).
        </Text>
      )}

      <div className={styles.messages} role="log" aria-live="polite">
        {messages.length === 0 && (
          <Text className={styles.empty} variant="body2">
            Спросите про диверсификацию, риски или структуру портфеля.
            {!hasAccount && ' Выберите счёт в панели сверху.'}
          </Text>
        )}

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`${styles.bubble} ${
              message.role === 'user'
                ? styles.bubbleUser
                : styles.bubbleAssistant
            }`}
          >
            {message.content ||
              (message.role === 'assistant' && isLoading ? '…' : '')}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <Text className={styles.error} role="alert" variant="body2">
          {error}
        </Text>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          className={styles.input}
          multiline
          minRows={1}
          maxRows={4}
          placeholder="Ваш вопрос…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void handleSubmit(e);
            }
          }}
          inputProps={{ 'aria-label': 'Сообщение чата' }}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={isLoading || !draft.trim()}
          aria-label="Отправить"
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <SendOutlined />
          )}
        </IconButton>
      </form>

      <Text className={styles.hint} variant="caption">
        {disclaimer}
        {canUsePortfolio
          ? ' Запросы идут на ваш сервер; в GigaChat уходят только агрегаты.'
          : ' Запросы идут на ваш сервер без контекста портфеля.'}
      </Text>
    </section>
  );
};

InvestmentChat.displayName = 'InvestmentChat';
