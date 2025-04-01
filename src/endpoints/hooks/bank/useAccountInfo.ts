import { AVAILABLE_BANKS } from "endpoints/lib/constants/availableBanks";
import { CLUSTERS } from "endpoints/lib/constants/clasters";

import { useEndpoint } from "../useEndpoint";

import { Accounts } from "../../model/types/bank/accounts";
import { AccountsDTO } from "../../model/types/bank/DTO/accountsDTO";

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
            enabled: !!AVAILABLE_BANKS[bankName.toUpperCase() as keyof typeof AVAILABLE_BANKS],
        }
    })
}
