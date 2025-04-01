import { z } from "zod"
import { AccountSchema } from "zodSchemas/banks/account"

export type Account = z.infer<typeof AccountSchema>

export type Accounts = Account[]
