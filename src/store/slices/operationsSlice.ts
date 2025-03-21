import { Dayjs } from "dayjs";

import { Operations } from "model/types/store/operations";
import { StoreCreater } from "model/types/store/storeCreater";
    
export const operationsSlice: StoreCreater<Operations> = (set) => ({
    from: undefined,
    to: undefined,
    setFrom: (from?: Dayjs | null) => set((state) => {
        state.from = from
    }),
    setTo: (to?: Dayjs | null) => set((state) => {
        state.to = to
    })
})
