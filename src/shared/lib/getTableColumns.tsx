import { createColumnHelper } from '@tanstack/react-table';

import { TableProps } from '../model/types/table';

export type TableColumnProps<T> = TableProps<T>;

export const getTableColumns = <T,>(props: TableColumnProps<T>) => {
  const { data, columns, keys } = props;

  const columnHelper = createColumnHelper<T>();
  const innerKeys = keys ?? Object.keys(data[0] || {});

  const generatedColumns =
    columns ??
    innerKeys.map((key) => {
      return columnHelper.accessor((row) => row[key as keyof T], {
        id: key,
        cell: (info) => <i>{String(info.getValue())}</i>,
        header: () => <span>{key}</span>,
        footer: (info) => info.column.id,
      });
    });

  return generatedColumns;
};
