import TableRow from '@mui/material/TableRow';

import { Cell } from './Cell';

import { TableCellOptions } from '../../model/types/tableOptions';

export type RowProps<T> = {
  data: T;
  options?: Omit<TableCellOptions, 'children'>;
};

export const Row = <T extends object>(props: RowProps<T>) => {
  const { options, data } = props;

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {Object.keys(data).map((key: string) => (
        <Cell key={key} options={options}>
          {`${data[key as keyof typeof data]}`}
        </Cell>
      ))}
    </TableRow>
  );
};
