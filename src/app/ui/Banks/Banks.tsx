import {
  SBER_BANK_OPERATIONS_ROUTE,
  T_BANK_OPERATIONS_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import { Accordion } from 'shared/ui/Accordion';
import { NavLink } from 'shared/ui/NavLink';
import { Text } from 'shared/ui/Typography';

import styles from './Banks.module.css';

export const Banks = () => {
  return (
    <Accordion.Root
      style={{ boxShadow: 'none' }}
      sx={{
        backgroundColor: 'var(--color-light-bg-secondary)',
      }}
      disableGutters
      defaultExpanded
    >
      <Accordion.Summary>
        <Text color="secondary">Брокеры</Text>
      </Accordion.Summary>
      <Accordion.Details className={styles.links}>
        <Accordion.Root>
          <Accordion.Summary>
            <Text color="secondary">Т Инвестиции</Text>
          </Accordion.Summary>
          <Accordion.Details>
            <NavLink className={styles.link} to={T_BANK_OPERATIONS_ROUTE}>
              Операции
            </NavLink>
          </Accordion.Details>
        </Accordion.Root>
        <Accordion.Root>
          <Accordion.Summary>
            <Text color="secondary">Сбер инвестиции</Text>
          </Accordion.Summary>
          <Accordion.Details>
            <NavLink className={styles.link} to={SBER_BANK_OPERATIONS_ROUTE}>
              Операции
            </NavLink>
          </Accordion.Details>
        </Accordion.Root>
      </Accordion.Details>
    </Accordion.Root>
  );
};

Banks.displayName = 'Banks';
