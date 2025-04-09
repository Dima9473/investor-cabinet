import { ColumnDef } from '@tanstack/react-table';
import { CURRENCY } from 'lib/constants/currency';
import { INSTRUMENT_TYPES } from 'lib/constants/instrymentTypes';

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
    meta: {
      filterVariant: 'autocomplete',
    },
  },
  {
    accessorKey: 'instrumentType',
    header: 'Тип инструмента',
    cell: ({ row }) => {
      const type = row.getValue('instrumentType') as string;
      return INSTRUMENT_TYPES[type as keyof typeof INSTRUMENT_TYPES];
    },   
     meta: {
      filterVariant: 'autocomplete',
    },
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
    cell: ({ row }) => {
      const currency = row.getValue('currency') as string;
      return CURRENCY[currency as keyof typeof CURRENCY];
    },
    meta: {
      filterVariant: 'autocomplete',
    },
  }

]; 
