import { AllocationItem, InstrumentKind } from 'shared/api/investor';

const kindLabel: Record<InstrumentKind, string> = {
  bond: 'Облигации',
  currency: 'Деньги и валюта',
  etf: 'Фонды',
  future: 'Фьючерсы',
  other: 'Прочее',
  share: 'Акции',
};

const colors: Record<InstrumentKind, string> = {
  bond: 'var(--color-purple)',
  currency: 'var(--color-accent)',
  etf: 'var(--color-warning)',
  future: 'var(--color-danger)',
  other: 'var(--text-tertiary)',
  share: 'var(--color-primary)',
};

type AllocationChartProps = {
  items: AllocationItem[];
};

export const AllocationChart = ({ items }: AllocationChartProps) => {
  let cursor = 0;
  const gradient = items
    .map((item) => {
      const start = cursor;
      cursor += item.percent;
      return `${colors[item.kind]} ${start}% ${cursor}%`;
    })
    .join(', ');

  return (
    <div className="allocation-chart">
      <div
        aria-label={items
          .map((item) => `${kindLabel[item.kind]} ${item.percent}%`)
          .join(', ')}
        className="allocation-chart__donut"
        role="img"
        style={{ background: `conic-gradient(${gradient})` }}
      >
        <span>
          <strong>100%</strong>
          <small>активов</small>
        </span>
      </div>
      <ul className="allocation-chart__legend">
        {items.map((item) => (
          <li key={item.kind}>
            <i style={{ background: colors[item.kind] }} />
            <span>{kindLabel[item.kind]}</span>
            <strong>{item.percent}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
