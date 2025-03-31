import { CLUSTERS } from "../../lib/constants/clasters"

export type FetchFnParams<TData, TSelected = TData> = {    
    paths: string[]
    cluster: CLUSTERS
    options?: RequestInit
    errorHandler?: (error: Error) => void
    mapper: (data: TSelected) => Promise<TData> | TData
}


