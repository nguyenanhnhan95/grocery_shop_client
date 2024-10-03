'use client'
import { useFetchData } from "../fetch-authencation/useFetchData";
import { useEffect } from "react";
import { createActionURL } from "@/utils/commonUtils";
import { useRouter } from "next/navigation";

export const useAuthentication=()=>{
    const { fetchData, code,  isPending } = useFetchData();
    const router = useRouter();

    // Memoized fetch to avoid unnecessary re-fetches
    useEffect(() => {
        const authorizePage = async () => {
          await fetchData(createActionURL("auth/check-auth").instant());
        };
        authorizePage();
      }, [fetchData]);
      return { code,isPending };
}