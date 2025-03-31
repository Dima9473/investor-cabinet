
import { z } from "zod";
import { OperationSchema } from "zodSchemas/banks/operation";

export type OperationDTO = z.infer<typeof OperationSchema>
