import { STORE_NAME } from 'lib/constants/storeName';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import { accountsSlice } from './slices/accounts';
import { operationsSlice } from './slices/operationsSlice';
import { userSlice } from './slices/userSlice';

import { RootStore } from 'model/types/store/rootStore';
import { StoreCreater } from 'model/types/store/storeCreater';

export const store: StoreCreater<RootStore> = (...storeArgs) => ({
    ...userSlice(...storeArgs),
    ...operationsSlice(...storeArgs),
    ...accountsSlice(...storeArgs)
})

export const useStore = createWithEqualityFn<RootStore>()(
    subscribeWithSelector(
        devtools(persist(immer(store), {
            name: STORE_NAME,            
          }), {
            enabled: false
        })
    )
)
