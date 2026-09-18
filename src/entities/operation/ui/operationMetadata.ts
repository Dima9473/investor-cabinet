import { OperationType } from 'shared/api/investor';
import { IconName } from 'shared/ui/Icon';

export const operationTypeLabel: Record<OperationType, string> = {
  buy: 'Покупка',
  coupon: 'Купон',
  deposit: 'Пополнение',
  dividend: 'Дивиденды',
  fee: 'Комиссия',
  other: 'Операция',
  sell: 'Продажа',
  tax: 'Налог',
  unknown: 'Операция',
  withdraw: 'Вывод',
};

export const operationTypeIcon: Record<OperationType, IconName> = {
  buy: 'arrowDown',
  coupon: 'wallet',
  deposit: 'arrowDown',
  dividend: 'trendUp',
  fee: 'receipt',
  other: 'operations',
  sell: 'trendUp',
  tax: 'receipt',
  unknown: 'operations',
  withdraw: 'arrowRight',
};
