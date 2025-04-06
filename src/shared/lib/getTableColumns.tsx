import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { TableProps } from '../model/types/table';

export type TableColumnProps<TData> = TableProps<TData>;

export const getTableColumns = <TData,>(
  props: TableColumnProps<TData>,
): ColumnDef<TData>[] => {
  const { data, columns, keys } = props;

  const columnHelper = createColumnHelper<TData>();
  const innerKeys = keys ?? Object.keys(data[0] || {});

  const generatedColumns =
    columns ??
    innerKeys.map((key) => {
      return columnHelper.accessor((row) => row[key as keyof TData], {
        id: key,
        cell: (info) => <i>{String(info.getValue())}</i>,
        header: () => <span>{key}</span>,
        footer: (info) => info.column.id,
      });
    });

  return generatedColumns as ColumnDef<TData>[];
};
