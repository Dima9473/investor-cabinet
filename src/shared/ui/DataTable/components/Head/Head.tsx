import { flexRender, Table } from '@tanstack/react-table';
import { Fragment } from 'react';

import { Filter } from '../Filter';

import styles from './Head.module.css';

export const Head = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Fragment key={headerGroup.id}>
          <tr>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={styles.head}
              >
                <div className={styles.title}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </div>
              </th>
            ))}
          </tr>
          <tr>
            {headerGroup.headers.map((header) => (
              <th
                key={`${header.id}-filter`}
                colSpan={header.colSpan}
                className={styles.filterHead}
              >
                <div className={styles.filter}>
                  {header.column.getCanFilter() ? (
                    <Filter column={header.column} />
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </Fragment>
      ))}
    </thead>
  );
};

Head.displayName = 'Head';
