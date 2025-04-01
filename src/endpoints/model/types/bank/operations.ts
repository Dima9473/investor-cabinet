import { z } from "zod";
import { OperationsSchema } from "zodSchemas/banks/operations";

export type Operations = z.infer<typeof OperationsSchema>
