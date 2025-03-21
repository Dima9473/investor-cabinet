import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Cell } from './Cell';

import { HeadOptions } from '../../model/types/tableOptions';

export type HeadProps<T> = {
  data: T;
  options?: HeadOptions;
};

export const Head = <T extends object>(props: HeadProps<T>) => {
  const { data, options } = props;

  return (
    <TableHead>
      <TableRow>
        {Object.keys(data).map((key: string) => (
          <Cell key={key} options={options}>
            {`${data[key as keyof typeof data]}`}
          </Cell>
        ))}
      </TableRow>
    </TableHead>
  );
};
