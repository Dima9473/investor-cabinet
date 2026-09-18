import { Button, CircularProgress } from '@mui/material';
import { isBankAbailable } from 'endpoints/lib/isBankAbailable';
import { useMemo } from 'react';
import { useStore } from 'store/useStore';

import { Accordion } from 'shared/ui/Accordion/Accordion';
import { AccordionDetails } from 'shared/ui/Accordion/AccordionDetails';
import { AccordionSummary } from 'shared/ui/Accordion/AccordionSummary';
import { Text } from 'shared/ui/Typography/Text/Text';
import { getOperationsParams } from 'entities/bank/lib/getOperationsParams';
import { toPortfolioAnalysisBody } from 'entities/bank/lib/toPortfolioAnalysisBody';

import { usePortfolioAnalysis } from 'endpoints/hooks/bank/usePortfolioAnalysis';

import styles from './PortfolioAnalysis.module.css';

/** Блок AI-анализа портфеля через middleware (без прямого доступа к GigaChat) */
export const PortfolioAnalysis = () => {
  const { from, to, account, bankId } = useStore();
  const { mutate, data, error, isPending, reset } = usePortfolioAnalysis();

  const requestBody = useMemo(() => {
    if (!account || !bankId) {
      return null;
    }

    const params = getOperationsParams({
      accountId: account.id,
      from,
      to,
      bankName: bankId,
    });

    return toPortfolioAnalysisBody(params);
  }, [account, bankId, from, to]);

  const canAnalyze =
    Boolean(requestBody) && isBankAbailable(bankId) && !isPending;

  const runAnalysis = () => {
    if (!requestBody || !bankId) {
      return;
    }

    reset();
    mutate({ bankName: bankId, ...requestBody });
  };

  if (!isBankAbailable(bankId)) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="AI-анализ портфеля">
      <div className={styles.actions}>
        <Button
          variant="contained"
          onClick={runAnalysis}
          disabled={!canAnalyze || !account}
        >
          {isPending ? 'Анализируем…' : 'Проанализировать портфель'}
        </Button>
        {isPending && <CircularProgress size={24} aria-hidden />}
        {!account && (
          <Text variant="body2" color="secondary">
            Выберите счёт для анализа
          </Text>
        )}
      </div>

      {error && (
        <Text className={styles.error} role="alert" variant="body2">
          {error.message}
        </Text>
      )}

      {data && (
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Text variant="subtitle1">Результат анализа</Text>
          </AccordionSummary>
          <AccordionDetails>
            <Text variant="body1">{data.analysis.summary}</Text>

            {data.analysis.risks.length > 0 && (
              <>
                <Text variant="subtitle2" sx={{ mt: 2 }}>
                  Риски
                </Text>
                <ul className={styles.list}>
                  {data.analysis.risks.map((risk) => (
                    <li key={risk}>
                      <Text variant="body2">{risk}</Text>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Text variant="subtitle2" sx={{ mt: 2 }}>
              Диверсификация
            </Text>
            <Text variant="body2">{data.analysis.diversification}</Text>

            {data.analysis.observations.length > 0 && (
              <>
                <Text variant="subtitle2" sx={{ mt: 2 }}>
                  Наблюдения
                </Text>
                <ul className={styles.list}>
                  {data.analysis.observations.map((item) => (
                    <li key={item}>
                      <Text variant="body2">{item}</Text>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className={styles.metrics}>
              <span>
                Операций: {data.metrics.summary.totalOperations}
              </span>
              {data.period.from && <span>С: {data.period.from}</span>}
              {data.period.to && <span>По: {data.period.to}</span>}
            </div>

            <Text className={styles.disclaimer} variant="caption">
              {data.analysis.disclaimer}
            </Text>
          </AccordionDetails>
        </Accordion>
      )}
    </section>
  );
};

PortfolioAnalysis.displayName = 'PortfolioAnalysis';
