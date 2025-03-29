import { Account, Accounts } from "endpoints/model/types/banks/accounts";
import { AccountStore } from "model/types/store/accounts";
import { StoreCreater } from "model/types/store/storeCreater";
    
export const accountsSlice: StoreCreater<AccountStore> = (set) => ({
    account: undefined,
    accounts: [],
    setAccount: (account?: Account) => set({ account }),
    setAccounts: (accounts?: Accounts) => set({ accounts }),
})
