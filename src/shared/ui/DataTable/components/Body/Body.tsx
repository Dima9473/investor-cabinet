import { flexRender, Table } from '@tanstack/react-table';

import styles from './Body.module.css';

export const Body = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className={styles.cell}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
