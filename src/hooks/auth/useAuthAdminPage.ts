'use client'
import { useFetchData } from "../fetch-authencation/useFetchData";
import { useEffect } from "react";
import { createActionURL } from "@/utils/commonUtils";
import { useRouter } from "next/navigation";

export const useAuthAdminPage=(requirePage:string)=>{
    const { fetchData, code,  isPending } = useFetchData();
    const router = useRouter();


    useEffect(() => {
        const authorizePage = async () => {
          await fetchData(createActionURL("auth/authorize-page").requestParam([{ key: 'require-page', value: requirePage }]));
        };
        authorizePage();
      }, [fetchData]);

      useEffect(() => {
        if (code !== null && code !== 200) {
          router.push("/"); 
        }
      }, [code, router]);
      return { code,isPending };
}