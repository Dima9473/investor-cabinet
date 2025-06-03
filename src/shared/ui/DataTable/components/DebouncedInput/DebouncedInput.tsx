import { useEffect, useState } from 'react';

/**
 * A typical debounced input react component
 * @param {string | number} value - The value of the input
 * @param {(value: string | number) => void} onChange - The function to call when the input value changes
 * @param {number} debounce - The debounce time in milliseconds
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - The props of the input
 * @returns {React.ReactNode}
 */
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
