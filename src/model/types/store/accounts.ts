import { Account, Accounts } from "endpoints/model/types/bank/accounts"

export type AccountStore = {
    account?: Account,
    accounts?: Accounts
    setAccount: (account?: Account) => void
    setAccounts: (accounts?: Accounts) => void
}

