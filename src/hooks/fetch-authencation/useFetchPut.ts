import { toastTopRight } from "@/config/toast";
import { useAppDispatch } from "@/lib/redux";
import { chaneProgressTop } from "@/redux/slice/common/loadingBarTop";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useFetchPut = <T>() => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [code, setCode] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<ApiResponseNoResult | null>(null);
    const dispatch = useAppDispatch();
    const fetchPut = useCallback(async (url:string, data:T, setErrors:(errors: any) => void) => {
        setIsPending(true);
        dispatch(chaneProgressTop(20))
        try {
            const response = await axios.put<ApiResponseNoResult>(url, data, { withCredentials: true });
            dispatch(chaneProgressTop(50))
            setMessage(response.data.message);
            setCode(response.data.code);
        } catch (error) {
            console.log(error)
            dispatch(chaneProgressTop(50))
            const axiosError = error as AxiosError;
            const responseData = axiosError.response?.data as ConstraintErrors | undefined;
            if (responseData) {
                setErrors(responseData.result);
            }
            const responseError = axiosError.response?.data as ApiResponseNoResult | undefined;
            if (responseError) {
                setError(responseError)
            }
        } finally {
            dispatch(chaneProgressTop(100))
            setIsPending(false);
        }
    }, []);

    return { fetchPut, isPending, code, message };
};