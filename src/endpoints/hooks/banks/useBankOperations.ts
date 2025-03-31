import { CLUSTERS } from "../../lib/constants/clasters"
import { useEndpoint } from "../useEndpoint"

import { OperationsDTO } from "../../model/types/banks/DTO/operationsDTO"
import { Operations } from "../../model/types/banks/operations"
import { OperationsRequest } from "../../model/types/banks/requests/operationsRequest"

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
            enabled: !!bankName,
        }
    })
}
