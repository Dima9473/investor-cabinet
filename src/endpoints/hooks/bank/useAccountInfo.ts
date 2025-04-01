import { CLUSTERS } from "endpoints/lib/constants/clasters";
import { isBankAbailable } from "endpoints/lib/isBankAbailable";

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
            enabled: !!bankName,
            retry: isBankAbailable(bankName) ? 3 : false,
        }
    })
}
