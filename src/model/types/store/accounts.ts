import { Account, Accounts } from "endpoints/types/banks/accounts"

export type AccountStore = {
    account?: Account,
    accounts?: Accounts
    setAccount: (account?: Account) => void
    setAccounts: (accounts?: Accounts) => void
}

