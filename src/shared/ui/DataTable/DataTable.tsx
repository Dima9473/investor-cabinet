import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { memo, useMemo } from 'react';

import { getTableColumns } from '../../lib/getTableColumns';

import { TableProps } from '../../model/types/table';

import styles from './DataTable.module.css';

const DataTableComponent = <TData,>(props: TableProps<TData>) => {
  const { data, columns, showFooter = false, className } = props;
  const innerColumns = useMemo(
    () => getTableColumns({ data, columns }),
    [data, columns],
  );

  const table = useReactTable({
    data,
    columns: innerColumns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  return (
    <table className={classNames(styles.table, className)}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ position: 'relative', width: header.getSize() }}
                className={styles.head}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? 'isResizing' : ''
                    }`}
                  ></div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{ width: cell.column.getSize() }}
                className={styles.cell}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {showFooter && (
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className={styles.head}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
};

export const DataTable = memo(DataTableComponent) as typeof DataTableComponent;
