import { isBankAbailable } from "endpoints/lib/isBankAbailable";

import { CLUSTERS } from "../../lib/constants/clasters"
import { useEndpoint } from "../useEndpoint"

import { OperationsDTO } from "../../model/types/bank/DTO/operationsDTO"
import { Operations } from "../../model/types/bank/operations"
import { OperationsRequest } from "../../model/types/bank/requests/operationsRequest"
type UseBankOperationsProps = Omit<OperationsRequest, 'bankName'> & {
    bankName: string
}

const OPERATIONS_STALE_TIME_MS = 5 * 60 * 1000

const toQueryKeyDate = (value?: Date) =>
    value instanceof Date ? value.toISOString() : ''

export const useBankOperations = (props?: UseBankOperationsProps) => {

    const { bankName = '', ...rest } = props || {} as UseBankOperationsProps

    const queryKey = [
        bankName,
        'operations',
        rest?.accountId ?? '',
        toQueryKeyDate(rest?.from),
        toQueryKeyDate(rest?.to),
    ] as const

    return useEndpoint({
        queryFnOptions: {
            paths: ['operations', bankName],
            cluster: CLUSTERS.BANKS,
            options: {
                method: 'POST',
                body: JSON.stringify(rest)
            },
            mapper: (data: OperationsDTO): Operations => data
        },
        queryOptions: {
            queryKey: [...queryKey],
            enabled: !!bankName,
            staleTime: OPERATIONS_STALE_TIME_MS,
            retry: isBankAbailable(bankName) ? 3 : false,
        }
    })
}
