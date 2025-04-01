import { OperationsDTO } from "../../model/types/bank/DTO/operationsDTO";

export const operationsAdapter = (operations: OperationsDTO) => {
    return {
        accountId: operations.accountId,
        operations: operations.operations,
    };
}
