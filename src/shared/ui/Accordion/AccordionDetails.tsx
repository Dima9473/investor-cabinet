import {
  AccordionDetails as MuiAccordionDetails,
  AccordionDetailsProps,
} from '@mui/material';

export const AccordionDetails = (props: AccordionDetailsProps) => {
  const { children, ...rest } = props;
  return <MuiAccordionDetails {...rest}>{children}</MuiAccordionDetails>;
};

AccordionDetails.displayName = 'AccordionDetails';
