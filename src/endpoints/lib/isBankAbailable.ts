import { AVAILABLE_BANKS } from './constants/availableBanks';

export const isBankAbailable = (bankName: string) => AVAILABLE_BANKS[bankName.toUpperCase() as keyof typeof AVAILABLE_BANKS]

