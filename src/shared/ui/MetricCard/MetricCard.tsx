import { ReactNode } from 'react';

import { Card } from 'shared/ui/Card';
import { Icon, IconName } from 'shared/ui/Icon';

type MetricCardProps = {
  accent?: 'blue' | 'green' | 'orange' | 'purple';
  caption?: ReactNode;
  icon: IconName;
  label: string;
  value: ReactNode;
};

export const MetricCard = ({
  accent = 'blue',
  caption,
  icon,
  label,
  value,
}: MetricCardProps) => (
  <Card as="article" className="metric-card">
    <span className={`metric-card__icon metric-card__icon--${accent}`}>
      <Icon name={icon} />
    </span>
    <span className="metric-card__label">{label}</span>
    <strong className="metric-card__value">{value}</strong>
    {caption && <small>{caption}</small>}
  </Card>
);
