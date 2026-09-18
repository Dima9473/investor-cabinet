import { ChangeEvent, useEffect, useState } from 'react';

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

  const toInputValue = (date?: Date | null) => {
    if (!date || Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().slice(0, 10);
  };

  const fromInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    event.target.value ? new Date(`${event.target.value}T00:00:00`) : null;

  return (
    <div className={styles.container}>
      <label>
        <span>С</span>
        <input
          onChange={(event) => handleChangeFrom(fromInputValue(event))}
          type="date"
          value={toInputValue(innerFrom)}
        />
      </label>
      <label>
        <span>По</span>
        <input
          onChange={(event) => handleChangeTo(fromInputValue(event))}
          type="date"
          value={toInputValue(innerTo)}
        />
      </label>
    </div>
  );
};

DateRange.displayName = 'DateRange';
