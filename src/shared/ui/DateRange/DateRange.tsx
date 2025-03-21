import DatePicker from 'react-datepicker';

export type DateRangeProps = {
  from: Date;
  to: Date;
  onChange: (from: Date | null, to: Date | null) => void;
};

export const DateRange = (props: DateRangeProps) => {
  const { from, to, onChange } = props;
  return (
    <div>
      <DatePicker selected={from} onChange={(date) => onChange(date, to)} />
      <DatePicker selected={to} onChange={(date) => onChange(from, date)} />
    </div>
  );
};

DateRange.displayName = 'DateRange';
