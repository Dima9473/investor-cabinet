import { Autocomplete, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Modifier } from '@popperjs/core';
import { Column } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Select } from 'shared/ui/Select/Select';
import { DebouncedInput } from '../DebouncedInput';

/** Минимальная ширина выпадающего списка = ширина поля ввода */
const matchReferenceMinWidth: Modifier<'matchReferenceMinWidth', object> = {
  name: 'matchReferenceMinWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.minWidth = `${state.rects.reference.width}px`;
  },
};

/** Список не уже инпута; при длинном тексте — шире колонки */
const autocompleteListSlotProps = {
  popper: {
    placement: 'bottom-start' as const,
    modifiers: [matchReferenceMinWidth],
    sx: {
      width: 'auto !important',
    },
  },
  paper: {
    sx: {
      width: 'max-content',
      minWidth: '100%',
      maxWidth: '90vw',
    },
  },
  listbox: {
    sx: {
      '& .MuiAutocomplete-option': {
        whiteSpace: 'nowrap',
      },
    },
  },
};

/**
 * A filter component for a table column
 * @param {Column<TData, unknown>} column - The column to filter
 * @returns {React.ReactNode}
 */
export const Filter = <TData,>({
  column,
}: {
  column: Column<TData, unknown>;
}): React.ReactNode => {
  const { filterVariant, autoFilter } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .filter(Boolean)
            .sort()
            .slice(0, 5000),
    [column, filterVariant],
  );

  if (!autoFilter && !filterVariant) {
    return null;
  }

  if (filterVariant === 'range') {
    return (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0] !== undefined
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    );
  }

  if (filterVariant === 'select') {
    return (
      <Select
        options={sortedUniqueValues}
        onChange={(value) => column.setFilterValue(value)}
        value={columnFilterValue?.toString()}
      />
    );
  }

  if (filterVariant === 'autocomplete') {
    const filterValue = (columnFilterValue as string | null) ?? null;

    return (
      <Autocomplete
        fullWidth
        size="small"
        value={filterValue}
        slotProps={autocompleteListSlotProps}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            margin="none"
            hiddenLabel
            slotProps={{
              input: {
                ...params.InputProps,
              },
            }}
          />
        )}
        onChange={(_, value, reason) => {
          if (reason === 'selectOption' || reason === 'clear') {
            column.setFilterValue(value);
          }
        }}
        options={sortedUniqueValues}
      />
    );
  }

  if (filterVariant === 'date') {
    return <DatePicker />;
  }

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
      className="w-36 border shadow rounded"
    />
  );
};
