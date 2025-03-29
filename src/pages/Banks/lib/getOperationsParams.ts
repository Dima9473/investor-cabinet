import { endOfDay, parse } from "date-fns";

import { OperationsRequest } from "endpoints/types/banks/requests/operationsRequest";

type UseTbankOperationsParams = Omit<OperationsRequest, 'from' | 'to'> & {
    from?: string,
    to?: string,
    bankName: string
}


export const getOperationsParams = (params: UseTbankOperationsParams) => {
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
