import { useQuery } from "@tanstack/react-query"

import { fetchTBankAccounts } from "../api/fetchTBankAccounts"

export const useTbankAccounts = () => {
    return useQuery({
        queryKey: ['tbank', 'accounts'],
        queryFn: fetchTBankAccounts
    })
}
