import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
} from '@mui/material';
import { useMemo } from 'react';

import styles from './AccordionSummary.module.css';

export const AccordionSummary = (props: AccordionSummaryProps) => {
  const { children, expandIcon, sx, ...rest } = props;

  const innerExpandIcon = useMemo(
    () => expandIcon ?? <ExpandMoreIcon className={styles.icon} />,
    [expandIcon],
  );
  const innerSx = useMemo(() => ({ padding: 0, ...sx }), [sx]);

  return (
    <MuiAccordionSummary expandIcon={innerExpandIcon} sx={innerSx} {...rest}>
      {children}
    </MuiAccordionSummary>
  );
};

AccordionSummary.displayName = 'AccordionSummary';
