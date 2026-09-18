import { Money } from 'shared/api/investor';

const NANO_FACTOR = 1_000_000_000n;
const MINOR_FACTOR = 10_000_000n;

const currencySymbol: Record<string, string> = {
  eur: '€',
  rub: '₽',
  usd: '$',
};

export const moneyToNano = (money?: Money) => {
  if (!money || !/^-?\d+$/.test(money.units) || !Number.isInteger(money.nano)) {
    return 0n;
  }

  try {
    return BigInt(money.units) * NANO_FACTOR + BigInt(money.nano);
  } catch {
    return 0n;
  }
};

export const moneyFromNano = (value: bigint, currency = 'rub'): Money => ({
  currency,
  nano: Number(value % NANO_FACTOR),
  units: String(value / NANO_FACTOR),
});

export const moneyToDecimalString = (money?: Money) => {
  const value = moneyToNano(money);
  const negative = value < 0n;
  const absolute = negative ? -value : value;
  const units = absolute / NANO_FACTOR;
  const nano = String(absolute % NANO_FACTOR).padStart(9, '0');

  return `${negative ? '-' : ''}${units}.${nano}`;
};

export const moneyToApproximateNumber = (money?: Money) => {
  const nano = moneyToNano(money);
  const maxSafeNano = BigInt(Number.MAX_SAFE_INTEGER) * NANO_FACTOR;
  if (nano > maxSafeNano || nano < -maxSafeNano) {
    return nano > 0n ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
  }

  return Number(nano) / Number(NANO_FACTOR);
};

export const formatMoney = (money?: Money, showMinor = true) => {
  if (!money) {
    return '—';
  }

  const nano = moneyToNano(money);
  const negative = nano < 0n;
  const absolute = negative ? -nano : nano;
  const roundedMinor = (absolute + MINOR_FACTOR / 2n) / MINOR_FACTOR;
  const whole = roundedMinor / 100n;
  const minor = roundedMinor % 100n;
  const grouped = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(whole);
  const decimals =
    showMinor && minor > 0n ? `,${String(minor).padStart(2, '0')}` : '';
  const symbol = currencySymbol[money.currency.toLowerCase()];
  const currency = symbol ?? money.currency.toUpperCase();

  return `${negative ? '−' : ''}${grouped}${decimals} ${currency}`;
};

export const formatCompactMoney = (money?: Money) => formatMoney(money, false);

export const formatPercent = (value?: number | null, signed = false) => {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return 'Нет данных';
  }

  const sign = signed && value > 0 ? '+' : '';
  return `${sign}${new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 1,
  }).format(value)}%`;
};

const validDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDateTime = (value: string) => {
  const date = validDate(value);
  if (!date) {
    return 'Некорректная дата';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  }).format(date);
};

export const formatDate = (value: string) => {
  const date = validDate(value);
  if (!date) {
    return 'Некорректная дата';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const amountClassName = (value: number | bigint) => {
  if (value > 0) {
    return 'value-positive';
  }

  if (value < 0) {
    return 'value-negative';
  }

  return undefined;
};
