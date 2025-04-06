import { ColumnDef } from '@tanstack/react-table';

import { OperationColumns } from 'entities/bank/model/types/operationColumns';
import { formatCurrency } from '../formatCurrency';
import { formatDate } from '../formatDate';

export const operationColumns: ColumnDef<OperationColumns>[] = [
  {
    accessorKey: 'date',
    header: 'Дата',
    cell: ({ row }) => formatDate(row.getValue('date')),
  },
  {
    accessorKey: 'type',
    header: 'Тип операции',
  },
  {
    accessorKey: 'instrumentType',
    header: 'Тип инструмента',
  },
  {
    accessorKey: 'quantity',
    header: 'Количество',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: ({ row }) => {
      const price = row.getValue('price') as { units: string; nano: number; currency: string };
      return formatCurrency(price.units, price.nano, price.currency);
    },
  },
  {
    accessorKey: 'payment',
    header: 'Сумма',
    cell: ({ row }) => {
      const payment = row.getValue('payment') as { units: string; nano: number; currency: string };
      return formatCurrency(payment.units, payment.nano, payment.currency);
    },
  },
  {
    accessorKey: 'currency',
    header: 'Валюта',
  }
]; 
