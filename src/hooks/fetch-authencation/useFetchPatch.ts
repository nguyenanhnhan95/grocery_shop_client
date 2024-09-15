'use client'
import { toastTopRight } from "@/config/toast";
import { ApiResponse } from "@/types/apiResponse";
import { ConstraintErrors } from "@/types/constraintErros";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useFetchPatch = () => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [code, setCode] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const fetchPatch = useCallback(async (url:string, data:any, setErrors:(errors: any) => void) => {
        setIsPending(true);
        try {
            const response = await axios.patch<ApiResponse<unknown>>(url, data, { withCredentials: true });
            if (response.data?.code === 200) {
                setMessage(response.data.message);
            }
            setCode(response.data?.code ?? null);
            setIsPending(false);
        } catch (error) {
            const axiosError = error as AxiosError;
            const responseData = axiosError.response?.data as ConstraintErrors | undefined;
            if (responseData) {
                if (responseData.result.notification &&"notification" in responseData.result  ) {
                    toastTopRight.toastError(responseData.result?.notification);
                } else {
                    setErrors(responseData.result ||null);
                }
            }
            
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchPatch, isPending, code, message };
};