import { StoreCreater } from "model/types/store/storeCreater";
import { User } from "model/types/store/user";

export const userSlice: StoreCreater<User> = (set) => ({
    name: '',
    setName: (name: string) => set((state) => {
        state.name = name
    })
})
