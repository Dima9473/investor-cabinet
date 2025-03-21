import { Accounts } from "../banks/account"

export type AccountStore = {
    accounts: Accounts | undefined
    setAccounts: (accounts?: Accounts) => void
}

