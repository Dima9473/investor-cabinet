
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { CLUSTERS } from "../lib/constants/clasters";
import { createFetchFn } from "../lib/createFetchFn";

export type QueryFnProps<TData, TSelected = TData> = {
    paths: string[]
    cluster: CLUSTERS
    options?: RequestInit
    mapper: (data: TSelected) => Promise<TData> | TData
}

export type UseEndpointProps<TData, TError, TSelected = TData> = {
    queryFnOptions: QueryFnProps<TData, TSelected>
    queryOptions: Omit<UseQueryOptions<TData, TError, TSelected>, 'queryFn' | 'select'>
}

export const useEndpoint = <TData, TError, TSelected = TData>(props: UseEndpointProps<TData, TError, TSelected>) => {
    const { queryFnOptions, queryOptions } = props
    const queryFn = createFetchFn(queryFnOptions)

    return useQuery({
        ...queryOptions,
        queryFn
    })
}

