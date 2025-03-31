import { z } from "zod"
import { AccountSchema } from "zodSchemas/banks/account"

export type AccountDTO = z.infer<typeof AccountSchema>

export type AccountsDTO = AccountDTO[]
