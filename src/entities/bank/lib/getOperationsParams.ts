import { endOfDay, parse } from "date-fns";

import { OperationsRequest } from "endpoints/model/types/bank/requests/operationsRequest";

type UseBankOperationsParams = Omit<OperationsRequest, 'from' | 'to'> & {
    from?: string,
    to?: string,
    bankName: string
}

export const getOperationsParams = (params: UseBankOperationsParams) => {
    const { from, to, accountId, state, bankName, figi } = params;

    return {
        accountId,
        bankName,
        from: from ? parse(from, 'yyyy/MM/dd', new Date()) : undefined,
        to: to ? endOfDay(parse(to, 'yyyy/MM/dd', new Date())) : undefined,
        state,
        figi,
    }
}
