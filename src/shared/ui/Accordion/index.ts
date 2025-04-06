import { Accordion as AccordionComponent } from './Accordion';
import { AccordionDetails } from './AccordionDetails';
import { AccordionSummary } from './AccordionSummary';

export * from './Accordion';
export * from './AccordionDetails';
export * from './AccordionSummary';

const Accordion = {
  Root: AccordionComponent,
  Summary: AccordionSummary,
  Details: AccordionDetails,
};

export { Accordion };
