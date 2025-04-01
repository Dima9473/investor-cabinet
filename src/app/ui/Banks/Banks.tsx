import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import {
  SBER_BANK_ROUTE,
  T_BANK_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import { NavLink } from 'shared/ui/NavLink';

import styles from './Banks.module.css';

export const Banks = () => {
  return (
    <Accordion style={{ boxShadow: 'none' }} disableGutters defaultExpanded>
      <AccordionSummary>
        <Typography>Banks</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NavLink
          to={T_BANK_ROUTE}
          style={({ isActive }) => ({
            color: isActive ? 'red' : 'black',
          })}
          className={styles.link}
        >
          T-bank
        </NavLink>
        <br />
        <NavLink
          to={SBER_BANK_ROUTE}
          style={({ isActive }) => ({
            color: isActive ? 'red' : 'black',
          })}
          className={styles.link}
        >
          SberBank
        </NavLink>
      </AccordionDetails>
    </Accordion>
  );
};

Banks.displayName = 'Banks';
