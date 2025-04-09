import { CLUSTERS } from "endpoints/lib/constants/clasters";
import { isBankAbailable } from "endpoints/lib/isBankAbailable";

import { useEndpoint } from "../useEndpoint";

import { Accounts } from "../../model/types/bank/accounts";
import { AccountsDTO } from "../../model/types/bank/DTO/accountsDTO";
export const useAccountInfo = (bankId: string) => {
    return useEndpoint({
        queryFnOptions: {
            paths: ['accounts', bankId],
            cluster: CLUSTERS.BANKS,
            options: {
                method: 'POST'
            },
            mapper: (data: AccountsDTO): Accounts => data
        },
        queryOptions: {
            queryKey: [bankId, 'accounts'],
            enabled: !!bankId,
            retry: isBankAbailable(bankId) ? 3 : false,
        }
    })
}
