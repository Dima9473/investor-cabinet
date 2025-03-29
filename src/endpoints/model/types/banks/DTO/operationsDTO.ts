import { z } from "zod";
import { OperationsSchema } from "zodSchemas/banks/operations";

export type OperationsDTO = z.infer<typeof OperationsSchema>
