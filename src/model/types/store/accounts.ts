import { Account, Accounts } from "endpoints/model/types/banks/accounts"

export type AccountStore = {
    account?: Account,
    accounts?: Accounts
    setAccount: (account?: Account) => void
    setAccounts: (accounts?: Accounts) => void
}

