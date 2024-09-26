import { toastTopRight } from "@/config/toast";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useFetchDelete = ( url:string, handleReload:()=>void ) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const fetchDelete = useCallback(async () => {
        setIsPending(true);
        try {
            const response = await axios.delete<ApiResponseNoResult>(url, { withCredentials: true });
            if (response.data.code === 200) {
                handleReload()
                toastTopRight.toastSuccess(response.data?.message)
            }
            setIsPending(false);
            setError(null);
        } catch (error) {
            setError(error as AxiosError);
        } finally {
            setIsPending(false);
        }
    }, [handleReload,url]);

    return { fetchDelete, isPending, error };
};