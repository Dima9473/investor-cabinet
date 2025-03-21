import { Dayjs } from "dayjs"

export type Operations = {
    from?: Dayjs | null
    to?: Dayjs | null
    setFrom: (from?: Dayjs | null) => void
    setTo: (to?: Dayjs | null) => void
}
