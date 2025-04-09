import { BankStore } from "model/types/store/bank";
import { StoreCreater } from "model/types/store/storeCreater";

export const bankSlice: StoreCreater<BankStore> = (set) => ({
    bankId: '',
    setBankId: (bankId?: string) => set({ bankId }),
})
