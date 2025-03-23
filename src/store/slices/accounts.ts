import { Account, Accounts } from "model/types/banks/account";
import { AccountStore } from "model/types/store/accounts";
import { StoreCreater } from "model/types/store/storeCreater";
    
export const accountsSlice: StoreCreater<AccountStore> = (set) => ({
    account: undefined,
    accounts: [],
    setAccount: (account?: Account) => set({ account }),
    setAccounts: (accounts?: Accounts) => set({ accounts }),
})
