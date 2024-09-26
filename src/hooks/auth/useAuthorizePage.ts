'use client'

import { useEffect, useState } from "react"
import { useFetchData } from "../fetch-authencation/useFetchData"
import { createActionURL } from "@/utils/commonUtils"
import useNotificationModal from "../useNotificationModal"
import { useRouter } from "next/navigation"
import { NOT_AUTHORIZE } from "@/utils/commonConstants"


export const useAuthorizePage=(requirePage:string)=>{
    const router = useRouter();
    const showNotificationModal=useNotificationModal()
    const {fetchData,code,message} = useFetchData()
    useEffect(()=>{
        fetchData(`${createActionURL("auth/authorize-page").instant()}?require-page=${encodeURIComponent(requirePage)}`)
    },[fetchData])
    useEffect(()=>{
        if(code===403){
            showNotificationModal(message||NOT_AUTHORIZE,()=>router.push("/admin"))
        }
    },[code,message])
}