import { TableCellProps } from '@mui/material/TableCell';

export type Options = Omit<TableCellProps, 'children'> 

export type HeadOptions = Options;
export type TableCellOptions = Options;

export type TableOptions = {
  headColumns?: HeadOptions;
  tableCells?: TableCellOptions;
};

