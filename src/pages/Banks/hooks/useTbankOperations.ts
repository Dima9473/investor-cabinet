import { useQuery } from "@tanstack/react-query"

import { fetchTBankOperations } from "../../../endpoints/api/banks/tBank/fetchTBankOperations"

import { OperationsRequest } from "endpoints/types/banks/requests/operationsRequest"



export const useTbankOperations = (params?: OperationsRequest) => {
    return useQuery({
        queryKey: ['tbank', 'operations', params?.accountId, params?.from, params?.to],
        queryFn: () => {
            if(!params) {
                return null
            }
            
           return fetchTBankOperations(params)
        },
        enabled: !!params,
    })
}
