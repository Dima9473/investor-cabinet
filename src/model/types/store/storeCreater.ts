import { StateCreator } from "zustand";

import { RootStore } from "./rootStore";

export type StoreCreater<Slice> = StateCreator<
RootStore, 
    [["zustand/immer", never], ['zustand/subscribeWithSelector', never]], 
    [], 
    Slice
>;
