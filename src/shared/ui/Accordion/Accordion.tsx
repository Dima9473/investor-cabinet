import { Accordion as MuiAccordion, AccordionProps } from '@mui/material';
import { useMemo } from 'react';

export const Accordion = (props: AccordionProps) => {
  const { children, disableGutters, sx, style, ...rest } = props;

  const innerSx = useMemo(
    () => ({ backgroundColor: 'var(--color-light-bg-secondary)', ...sx }),
    [sx],
  );
  const innerDisableGutters = useMemo(
    () => (disableGutters === undefined ? true : disableGutters),
    [disableGutters],
  );
  const innerStyle = useMemo(() => ({ boxShadow: 'none', ...style }), [style]);

  return (
    <MuiAccordion
      disableGutters={innerDisableGutters}
      sx={innerSx}
      style={innerStyle}
      {...rest}
    >
      {children}
    </MuiAccordion>
  );
};

Accordion.displayName = 'Accordion';
