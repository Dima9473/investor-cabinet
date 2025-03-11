import { Operations } from "../model/types/operations";
import { OperationsRequest } from "../model/types/operationsRequest";

const URL = 'http://localhost:3000/operations/t-bank'

export const fetchTBankOperations = async (params: OperationsRequest): Promise<Operations> => {
    const response = await fetch(URL, { method: 'POST', body: JSON.stringify({ ...params }) })

    if (!response.ok) {
        throw new Error(response.statusText);
    }
  
    return await response.json();
}
