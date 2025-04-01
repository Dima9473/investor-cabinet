import { AVAILABLE_BANKS } from "endpoints/lib/constants/availableBanks"

import { CLUSTERS } from "../../lib/constants/clasters"
import { useEndpoint } from "../useEndpoint"

import { OperationsDTO } from "../../model/types/bank/DTO/operationsDTO"
import { Operations } from "../../model/types/bank/operations"
import { OperationsRequest } from "../../model/types/bank/requests/operationsRequest"
type UseBankOperationsProps = Omit<OperationsRequest, 'bankName'> & {
    bankName: string
}

export const useBankOperations = (props?: UseBankOperationsProps) => {
    const { bankName = '', ...rest } = props || {} as UseBankOperationsProps

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
            queryKey: [bankName, 'operations', rest?.accountId ?? '', rest?.from ?? '', rest?.to ?? ''],
            enabled: !!AVAILABLE_BANKS[bankName.toUpperCase() as keyof typeof AVAILABLE_BANKS],
        }
    })
}
