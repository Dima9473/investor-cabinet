
import { Operations } from "../../../types/banks/operations";
import { OperationsRequest } from "../../../types/banks/requests/operationsRequest";

const URL = 'http://localhost:3000/operations/t-bank'

export const fetchTBankOperations = async (params: OperationsRequest): Promise<Operations | null> => {
    const response = await fetch(URL, { method: 'POST', body: JSON.stringify({ ...params }) })

    if (!response.ok) {
        throw new Error(response.statusText);
    }
  
    return await response.json();
}
