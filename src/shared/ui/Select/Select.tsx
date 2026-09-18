import { ChangeEvent, useEffect, useState } from 'react';

import { SelectOption } from 'shared/model/types/select';

import styles from './Select.module.css';

export type SelectProps<T> = {
  value?: string;
  label?: string;
  options: SelectOption<T>[];
  onChange?: (value?: T) => void;
};

export const Select = <T,>(props: SelectProps<T>) => {
  const { options, label, onChange, value } = props;

  const [innerValue, setInnerValue] = useState<string>(value || '');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option) => option.id === event.target.value);
    setInnerValue(event.target.value);
    onChange?.(option?.option);
  };

  useEffect(() => {
    setInnerValue(value || '');
  }, [value]);

  return (
    <label className={styles.control}>
      {label && <span>{label}</span>}
      <select className={styles.select} onChange={handleChange} value={innerValue}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

Select.displayName = 'Select';
