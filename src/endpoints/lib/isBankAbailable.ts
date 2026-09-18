import { BANKS } from 'lib/constants/banks';

/** id банка из enum (t-bank), не ключ enum (T_BANK) */
const AVAILABLE_BANK_IDS = new Set<string>(Object.values(BANKS));

export const isBankAbailable = (bankId: string) =>
  Boolean(bankId) && AVAILABLE_BANK_IDS.has(bankId);

