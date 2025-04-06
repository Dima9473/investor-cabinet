import { BANKS } from 'lib/constants/banks';

export const isBankAbailable = (bankName: string) => BANKS[bankName.toUpperCase() as keyof typeof BANKS]

