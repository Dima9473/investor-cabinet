import { BANKS } from 'lib/constants/banks';

import { BankStore } from "model/types/store/bank";
import { StoreCreater } from "model/types/store/storeCreater";

export const bankSlice: StoreCreater<BankStore> = (set) => ({
    bankId: BANKS.T_BANK,
    setBankId: (bankId?: string) => set({ bankId: bankId ?? '' }),
})
