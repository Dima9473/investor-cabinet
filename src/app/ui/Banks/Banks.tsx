import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import {
  SBER_BANK_ROUTE,
  T_BANK_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import { NavLink } from 'shared/ui/NavLink';
import { Text } from 'shared/ui/Typography';

import styles from './Banks.module.css';

export const Banks = () => {
  return (
    <Accordion
      style={{ boxShadow: 'none' }}
      sx={{
        backgroundColor: 'var(--color-light-bg-secondary)',
      }}
      disableGutters
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={styles.icon} />}
        sx={{ padding: 0 }}
      >
        <Text color="secondary">Брокеры</Text>
      </AccordionSummary>
      <AccordionDetails className={styles.links}>
        <NavLink className={styles.link} to={T_BANK_ROUTE}>
          Т Инвестиции
        </NavLink>
        <NavLink className={styles.link} to={SBER_BANK_ROUTE}>
          Сбер инвестиции
        </NavLink>
      </AccordionDetails>
    </Accordion>
  );
};

Banks.displayName = 'Banks';
