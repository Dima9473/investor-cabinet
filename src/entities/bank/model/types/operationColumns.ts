import { Operation } from "endpoints/model/types/bank/operation";

export type OperationColumns = Pick<Operation, 'currency' | 'payment' | 'quantity' | 'price' | 'type' | 'date'>;
