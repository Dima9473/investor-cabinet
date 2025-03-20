import { Table } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { Head } from './Head';
import { Row } from './Row';

import { TableOptions } from '../../model/types/tableOptions';

export type BasicTableProps<T extends object & { id: string }> = {
  operations?: T[] | null;
  options?: TableOptions;
};

export const BasicTable = <T extends object & { id: string }>(
  props: BasicTableProps<T>,
) => {
  const { operations, options } = props;

  if (!operations) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Head data={operations[0]} options={options?.headColumns} />
        <TableBody>
          {operations.map((operation) => (
            <Row
              key={operation.id}
              data={operation}
              options={options?.tableCells}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
