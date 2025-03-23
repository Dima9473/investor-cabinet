import { OperationsDTO } from "../../types/banks/DTO/operationsDTO";

export const operationsAdapter = (operations: OperationsDTO) => {
    return {
        accountId: operations.accountId,
        operations: operations.operations,
    };
}
