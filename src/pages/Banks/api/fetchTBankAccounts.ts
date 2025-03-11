import { Accounts } from "../model/types/accounts"

const URL = 'http://localhost:3000/accounts/t-bank'

export const fetchTBankAccounts = async (): Promise<Accounts> => {
    const response = await fetch(URL, { method: 'POST' })

    if (!response.ok) {
        throw new Error(response.statusText);
    }
  
    return await response.json();
}
