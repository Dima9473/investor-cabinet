import { InvestmentChat } from 'features/Bank/ui/InvestmentChat';

import styles from './Journal.module.css';

export const Journal = () => {
  return (
    <div className={styles.page}>
      <InvestmentChat />
    </div>
  );
};

Journal.displayName = 'Journal';
