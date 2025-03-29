import { FetchFnParams } from "../model/types/fetchFn"

export const createFetchFn = <TData, TSelected = TData>(params: FetchFnParams<TData, TSelected>) => {
    const { cluster, paths, options, mapper, errorHandler } = params
    const path = paths.join('/')

    const queryFn = async () => {
        try {
            const response = await fetch(`${cluster}/${path}`, options)
            const data = await response.json() as TSelected

            return mapper(data) as TData
        } catch (error) {
            if(errorHandler) {
                throw await errorHandler(error as Error)
            }
            
            throw error
        }
    }

    return queryFn
}
