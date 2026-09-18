import { InvestorOperation } from 'shared/api/investor';
import {
  amountClassName,
  formatDateTime,
  formatMoney,
  moneyToNano,
} from 'shared/lib/formatInvestor';
import { operationTypeLabel } from './operationMetadata';

type OperationsTableProps = {
  accountName: string;
  items: InvestorOperation[];
};

export const OperationsTable = ({ accountName, items }: OperationsTableProps) => (
  <div className="data-table data-table--operations" role="table">
    <div className="data-table__row data-table__row--head" role="row">
      <span role="columnheader">Дата</span>
      <span role="columnheader">Тип</span>
      <span role="columnheader">Инструмент</span>
      <span role="columnheader">Счёт</span>
      <span role="columnheader">Сумма</span>
    </div>
    {items.map((operation) => {
      const amount = moneyToNano(operation.payment);

      return (
        <div className="data-table__row" key={operation.id} role="row">
          <span role="cell">{formatDateTime(operation.occurredAt)}</span>
          <span role="cell">
            <i className={`operation-dot operation-dot--${operation.type}`} />
            {operationTypeLabel[operation.type]}
          </span>
          <span role="cell">{operation.instrumentName ?? '—'}</span>
          <span role="cell">{accountName}</span>
          <strong className={amountClassName(amount)} role="cell">
            {formatMoney(operation.payment)}
          </strong>
        </div>
      );
    })}
  </div>
);
