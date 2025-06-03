import { flexRender, Table } from '@tanstack/react-table';

import { Filter } from '../Filter';

import styles from './Head.module.css';

export const Head = <TData,>({ table }: { table: Table<TData> }) => {
  return (
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
              {header.column.getCanFilter() ? (
                <div>
                  <Filter column={header.column} />
                </div>
              ) : null}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

Head.displayName = 'Head';
