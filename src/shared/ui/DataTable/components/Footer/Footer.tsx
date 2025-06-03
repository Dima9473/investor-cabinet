import { flexRender, Table } from '@tanstack/react-table';

import styles from './Footer.module.css';

export const Footer = <TData,>({ table }: { table: Table<TData> }) => {
  return (
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
  );
};

Footer.displayName = 'Footer';
