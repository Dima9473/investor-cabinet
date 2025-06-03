import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { memo, useMemo, useState } from 'react';

import { getTableColumns } from '../../lib/getTableColumns';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Head } from './components/Head/Head';

import { TableProps } from '../../model/types/table';

import styles from './DataTable.module.css';
declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    autoFilter?: boolean;
    filterVariant?: 'text' | 'range' | 'select' | 'autocomplete' | 'date';
  }
}

/**
 * A component that renders a table
 * @param {TableProps<TData>} props - The props of the table
 * @returns {React.ReactNode}
 */
const DataTableComponent = <TData,>(props: TableProps<TData>) => {
  const { data, columns, showFooter = false, className } = props;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const innerColumns = useMemo(
    () => getTableColumns({ data, columns }),
    [data, columns],
  );

  const table = useReactTable({
    data,
    columns: innerColumns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  return (
    <table className={classNames(styles.table, className)}>
      <Head table={table} />
      <Body table={table} />
      {showFooter && <Footer table={table} />}
    </table>
  );
};

DataTableComponent.displayName = 'DataTable';

export const DataTable = memo(DataTableComponent) as typeof DataTableComponent;
