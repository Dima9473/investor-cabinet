import { Account, Accounts } from "../banks/account"

export type AccountStore = {
    account?: Account,
    accounts?: Accounts
    setAccount: (account?: Account) => void
    setAccounts: (accounts?: Accounts) => void
}

