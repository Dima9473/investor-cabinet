import { format, parse } from 'date-fns';
import { useStore } from 'store/useStore';

import { DateRange } from 'shared/ui/DateRange';

export const SelectPeriod = () => {
  const { from, to, setFrom, setTo } = useStore();

  const handleChange = (from?: Date | null, to?: Date | null) => {
    setFrom(from ? format(from, 'yyyy/MM/dd') : undefined);
    setTo(to ? format(to, 'yyyy/MM/dd') : undefined);
  };

  return (
    <DateRange
      from={from ? parse(from, 'yyyy/MM/dd', new Date()) : null}
      to={to ? parse(to, 'yyyy/MM/dd', new Date()) : null}
      onChange={handleChange}
    />
  );
};

SelectPeriod.displayName = 'SelectPeriod';
