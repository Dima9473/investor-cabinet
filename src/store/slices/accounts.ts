import {  Accounts } from "model/types/banks/account";
import { AccountStore } from "model/types/store/accounts";
import { StoreCreater } from "model/types/store/storeCreater";
    
export const accountsSlice: StoreCreater<AccountStore> = (set) => ({
    accounts: [],
    setAccounts: (accounts?: Accounts) => set({ accounts }),
})
