import { useEffect } from "react";
import { useFetchData } from "../fetch-authencation/useFetchData";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";


export const useGetDataByIdParam = <T>(url: string,pathVariable:string|null|undefined) => {
    const { fetchData: fetchById, data: initialById, isPending: isPendingById, code: codeById } = useFetchData<T>();
   

    useEffect(() => {
        if (pathVariable) {
            fetchById(`${createActionURL(url).pathVariable(pathVariable)}`)
        }
    }, [fetchById, pathVariable]); 

    return { isPendingById, initialById, codeById };
};