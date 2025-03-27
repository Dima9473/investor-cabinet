import { AccountsDTO } from "../../../types/banks/DTO/accountsDTO"

const URL = 'http://localhost:3000/accounts/t-bank'

export const fetchTBankAccounts = async (): Promise<AccountsDTO> => {
    const response = await fetch(URL, { method: 'POST' })

    if (!response.ok) {
        throw new Error(response.statusText);
    }
  
    return await response.json();
}
