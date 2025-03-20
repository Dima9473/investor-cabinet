import TableCell from '@mui/material/TableCell';
import { PropsWithChildren } from 'react';

import { Options } from '../../model/types/tableOptions';

export type CellProps = {
  options?: Options;
};

export const Cell = (props: PropsWithChildren<CellProps>) => {
  const { options = {}, children } = props;
  const { ...rest } = options;

  return <TableCell {...rest}>{children}</TableCell>;
};
