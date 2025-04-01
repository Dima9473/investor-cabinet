
import { z } from "zod";
import { OperationSchema } from "zodSchemas/banks/operation";

export type Operation = z.infer<typeof OperationSchema>
