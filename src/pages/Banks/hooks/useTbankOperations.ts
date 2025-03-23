import { useQuery } from "@tanstack/react-query"

import { fetchTBankOperations } from "../api/fetchTBankOperations"

import { OperationsRequest } from "../model/types/operationsRequest"

export const useTbankOperations = (params?: OperationsRequest) => {
    return useQuery({
        queryKey: ['tbank', 'operations'],
        queryFn: () => {
            if(!params) {
                return null
            }
            
           return fetchTBankOperations(params)
        },
        enabled: !!params,
    })
}
