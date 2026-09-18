import { InvestorOperation } from 'shared/api/investor';
import {
  amountClassName,
  formatDateTime,
  formatMoney,
  moneyToNano,
} from 'shared/lib/formatInvestor';
import { Icon } from 'shared/ui/Icon';
import { operationTypeIcon, operationTypeLabel } from './operationMetadata';

type OperationListProps = {
  compact?: boolean;
  items: InvestorOperation[];
};

export const OperationList = ({ compact = false, items }: OperationListProps) => (
  <ul className={`operation-list ${compact ? 'operation-list--compact' : ''}`.trim()}>
    {items.map((operation) => {
      const amount = moneyToNano(operation.payment);

      return (
        <li key={operation.id}>
          <span className={`operation-icon operation-icon--${operation.type}`}>
            <Icon name={operationTypeIcon[operation.type]} size={18} />
          </span>
          <span>
            <strong>{operationTypeLabel[operation.type]}</strong>
            <small>
              {operation.instrumentName ?? operation.description} ·{' '}
              {formatDateTime(operation.occurredAt)}
            </small>
          </span>
          <b className={amountClassName(amount)}>{formatMoney(operation.payment)}</b>
        </li>
      );
    })}
  </ul>
);
