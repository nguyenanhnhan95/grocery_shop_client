'use client'

import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage"

export default function AddEmployee(){
    useAuthorizePage("employee:add")
    return(
        <>a</>
    )
}