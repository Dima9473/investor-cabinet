import { format, subMonths } from "date-fns";

import { Operations } from "model/types/store/operations";
import { StoreCreater } from "model/types/store/storeCreater";

const today = new Date();
const lastMonth = subMonths(today, 1);

export const operationsSlice: StoreCreater<Operations> = (set) => ({
    from: format(lastMonth, 'yyyy/MM/dd'),
    to: format(today, 'yyyy/MM/dd'),
    setFrom: (from?: string) => set((state) => {
        state.from = from
    }),
    setTo: (to?: string) => set((state) => {
        state.to = to
    })
})
