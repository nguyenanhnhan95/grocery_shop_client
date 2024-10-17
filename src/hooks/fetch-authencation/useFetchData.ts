'use client'
import { ApiResponse, ApiResponseNoResult } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useFetchData = <T>() => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null | ApiResponseNoResult>(null);
    const [data, setData] = useState<T | null>(null);
    const [code, setCode] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const fetchData = useCallback(async (url: string) => {
        setIsPending(true);
        try {
            const response = await axios.get<ApiResponse<T>>(url, { withCredentials: true });
            setData(response.data.result);
            setCode(response.data.code);
            setMessage(response.data.message);
            setError(null);
        } catch (err) {
            setData(null)
            console.log(err)
            const axiosError = err as AxiosError;
            const responseError = axiosError?.response?.data as ApiResponseNoResult | undefined;
            if (responseError) {
                setError(responseError)
                setCode(responseError.code)
                setMessage(responseError.message)
            } else {
                setError(axiosError)
            }           
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchData, data, isPending, error, code, message };
};