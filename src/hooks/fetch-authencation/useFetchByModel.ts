'use client'
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useFetchByModel = <T = unknown>() => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [data, setData] = useState<T | null>(null);
    const [code, setCode] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const fetchByModel = useCallback(async (url: string) => {
        setIsPending(true);
        try {
            const response = await axios.get<ApiResponse<T>>(url, { withCredentials: true });
            if (response.data.result !== undefined && response.data.result !== null) {
                setData(response.data.result);
            }
            setCode(response.data.code);
            setMessage(response.data.message);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err as AxiosError); // Kiểu AxiosError cho lỗi từ axios
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchByModel, data, isPending, error, code, message };
};