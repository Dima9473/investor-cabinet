import { PerformancePoint } from 'shared/api/investor';
import { moneyToApproximateNumber } from 'shared/lib/formatInvestor';

type PortfolioChartProps = {
  ariaLabel?: string;
  points: PerformancePoint[];
};

const WIDTH = 640;
const HEIGHT = 210;
const PADDING = 12;

const buildChart = (points: PerformancePoint[]) => {
  const values = points.map((point) => moneyToApproximateNumber(point.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = (WIDTH - PADDING * 2) / Math.max(points.length - 1, 1);

  return values
    .map((value, index) => {
      const x = PADDING + index * step;
      const ratio = (value - min) / range;
      const y = HEIGHT - PADDING - ratio * (HEIGHT - PADDING * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
};

export const PortfolioChart = ({
  ariaLabel = 'Динамика стоимости портфеля',
  points,
}: PortfolioChartProps) => {
  if (points.length === 0) {
    return null;
  }

  const line = buildChart(points);
  const area = `${PADDING},${HEIGHT - PADDING} ${line} ${WIDTH - PADDING},${HEIGHT - PADDING}`;

  return (
    <svg
      aria-label={ariaLabel}
      className="portfolio-chart"
      preserveAspectRatio="none"
      role="img"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    >
      <defs>
        <linearGradient id="portfolio-area-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="portfolio-chart__grid" d="M12 50H628M12 105H628M12 160H628" />
      <polygon fill="url(#portfolio-area-gradient)" points={area} />
      <polyline className="portfolio-chart__line" points={line} />
    </svg>
  );
};
