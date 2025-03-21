import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import styles from './DateRange.module.css';

export type DateRangeProps = {
  from?: Dayjs | null;
  to?: Dayjs | null;
  onChange?: (from?: Dayjs | null, to?: Dayjs | null) => void;
};

export const DateRange = (props: DateRangeProps) => {
  const { from, to, onChange } = props;

  const [innerFrom, setInnerFrom] = useState<Dayjs | null | undefined>(
    dayjs(from),
  );
  const [innerTo, setInnerTo] = useState<Dayjs | null | undefined>(dayjs(to));

  useEffect(() => {
    setInnerFrom(from);
    setInnerTo(to);
  }, [from, to]);

  const handleChangeFrom = (date: Dayjs | null) => {
    setInnerFrom(date);
    onChange?.(date, innerTo);
  };

  const handleChangeTo = (date: Dayjs | null) => {
    setInnerTo(date);
    onChange?.(innerFrom, date);
  };

  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From"
          value={innerFrom}
          onChange={handleChangeFrom}
        />
        <DatePicker label="To" value={innerTo} onChange={handleChangeTo} />
      </LocalizationProvider>
    </div>
  );
};

DateRange.displayName = 'DateRange';
