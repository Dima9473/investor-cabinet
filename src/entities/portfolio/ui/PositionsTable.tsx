import { PortfolioPosition } from 'shared/api/investor';
import {
  amountClassName,
  formatCompactMoney,
  formatPercent,
} from 'shared/lib/formatInvestor';

type PositionsTableProps = {
  positions: PortfolioPosition[];
};

export const PositionsTable = ({ positions }: PositionsTableProps) => (
  <div className="data-table data-table--positions" role="table">
    <div className="data-table__row data-table__row--head" role="row">
      <span role="columnheader">Инструмент</span>
      <span role="columnheader">Количество</span>
      <span role="columnheader">Цена</span>
      <span role="columnheader">Стоимость</span>
      <span role="columnheader">Результат</span>
    </div>
    {positions.map((position) => (
      <div className="data-table__row" key={position.instrumentUid} role="row">
        <span className="instrument-cell" role="cell">
          <i>{position.name.slice(0, 1)}</i>
          <span>
            <strong>{position.name}</strong>
            <small>
              {position.ticker} · {position.instrumentType}
            </small>
          </span>
        </span>
        <span role="cell">{position.quantity} шт.</span>
        <span role="cell">{formatCompactMoney(position.currentPrice)}</span>
        <strong role="cell">{formatCompactMoney(position.value)}</strong>
        <em
          className={amountClassName(position.expectedYieldPercent)}
          role="cell"
        >
          {formatPercent(position.expectedYieldPercent, true)}
        </em>
      </div>
    ))}
  </div>
);
