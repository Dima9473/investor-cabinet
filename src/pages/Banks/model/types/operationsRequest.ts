import { Dayjs } from "dayjs"

export type OperationsRequest = {
    accountId: string,
    from?: Dayjs,
    to?: Dayjs,
    state?: string,
    figi?: string
}
