"use client"

import { getUserActive } from "@/services/authService"
import { useQuery } from "@tanstack/react-query"




export const useAuth = () => {

    const {data, isError, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getUserActive,
        retry: false,
        refetchOnWindowFocus: false
    })
    return {data, isError, isLoading}
}