import { useQuery } from "@tanstack/react-query"

import { fetchTBankAccounts } from "../../../endpoints/api/banks/tBank/fetchTBankAccounts"

export const useTbankAccounts = () => {
    return useQuery({
        queryKey: ['tbank', 'accounts'],
        queryFn: fetchTBankAccounts
    })
}
