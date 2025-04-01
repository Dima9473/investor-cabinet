import { INDICATORS } from 'pages/KnowledgeCatalog/lib/constants/indicators';

import styles from './KnowledgeCatalog.module.css';

export const KnowledgeCatalog = () => {
  return (
    <div>
      <h1>Knowledge Catalog</h1>
      <div>
        <ol className={styles.list}>
          {INDICATORS.map((indicator) => (
            <li key={indicator.id} className={styles.container}>
              <b>{indicator.name}</b>
              <div className={styles.description}>
                <span>{indicator.description}</span>
                <span>{indicator.whenToUse}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
