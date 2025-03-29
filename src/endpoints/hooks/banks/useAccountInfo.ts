import { CLUSTERS } from "endpoints/lib/constants/clasters";

import { useEndpoint } from "../useEndpoint";

import { Accounts } from "../../types/banks/accounts";
import { AccountsDTO } from "../../types/banks/DTO/accountsDTO";

export const useAccountInfo = (bankName: string) => {
    return useEndpoint({
        queryFnOptions: {
            paths: ['accounts', bankName],
            cluster: CLUSTERS.BANKS,
            options: {
                method: 'POST'
            },
            mapper: (data: AccountsDTO): Accounts => data
        },
        queryOptions: {
            queryKey: [bankName, 'accounts'],
            enabled: !!bankName,
        }
    })
}
