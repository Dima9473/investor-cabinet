import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';

import styles from './DateRange.module.css';

export type DateRangeProps = {
  from?: Date | null;
  to?: Date | null;
  onChange?: (from?: Date | null, to?: Date | null) => void;
};

export const DateRange = (props: DateRangeProps) => {
  const { from, to, onChange } = props;

  const [innerFrom, setInnerFrom] = useState<Date | null | undefined>(from);
  const [innerTo, setInnerTo] = useState<Date | null | undefined>(to);

  useEffect(() => {
    setInnerFrom(from);
    setInnerTo(to);
  }, [from, to]);

  const handleChangeFrom = (date: Date | null) => {
    setInnerFrom(date);
    onChange?.(date, innerTo);
  };

  const handleChangeTo = (date: Date | null) => {
    setInnerTo(date);
    onChange?.(innerFrom, date);
  };

  return (
    <div className={styles.container}>
      {String(innerFrom)}
      {String(innerTo)}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="From"
          defaultValue={innerFrom}
          value={innerFrom}
          onChange={handleChangeFrom}
        />
        <DatePicker
          label="To"
          defaultValue={innerTo}
          value={innerTo}
          onChange={handleChangeTo}
        />
      </LocalizationProvider>
    </div>
  );
};

DateRange.displayName = 'DateRange';
