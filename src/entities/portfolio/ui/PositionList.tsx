import { PortfolioPosition } from 'shared/api/investor';
import {
  amountClassName,
  formatCompactMoney,
  formatPercent,
} from 'shared/lib/formatInvestor';

type PositionListProps = {
  positions: PortfolioPosition[];
};

export const PositionList = ({ positions }: PositionListProps) => (
  <ul className="mobile-entity-list">
    {positions.map((position) => (
      <li key={position.instrumentUid}>
        <i className="ticker-mark">{position.name.slice(0, 1)}</i>
        <span>
          <strong>{position.name}</strong>
          <small>
            {position.quantity} шт. · {formatCompactMoney(position.value)}
          </small>
        </span>
        <b className={amountClassName(position.expectedYieldPercent)}>
          {formatPercent(position.expectedYieldPercent, true)}
        </b>
      </li>
    ))}
  </ul>
);
