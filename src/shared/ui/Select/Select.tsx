import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { SelectOption } from 'shared/model/types/select';

export type SelectProps<T> = {
  value?: string;
  label?: string;
  options: SelectOption<T>[];
  onChange?: (value?: SelectOption<T>) => void;
};

const toSafeSelectValue = (value: string | undefined, options: { id: string }[]) =>
  value && options.some((option) => option.id === value) ? value : '';

export const Select = <T,>(props: SelectProps<T>) => {
  const { options, label, onChange, value } = props;

  const safeValue = toSafeSelectValue(value, options);
  const [innerValue, setInnerValue] = useState<string>(safeValue);
  const optionIdsKey = useMemo(
    () => options.map((option) => option.id).join('|'),
    [options],
  );

  const handleChange = (event: SelectChangeEvent) => {
    const option = options.find((option) => option.id === event.target.value);
    setInnerValue(event.target.value as string);
    onChange?.(option);
  };

  useEffect(() => {
    setInnerValue(toSafeSelectValue(value, options));
  }, [value, optionIdsKey, options]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {label && (
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        )}
        <MuiSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={innerValue}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

Select.displayName = 'Select';
