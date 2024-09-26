'use client'
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { chaneProgressTop } from "@/redux/slice/common/loadingBarTop";
import { RootState } from "@/setting/store";
import { createActionURL } from "@/utils/commonUtils";
import axios, { AxiosError } from "axios";
import {  useEffect, useState } from "react";

export const useFetchSearch = <T >(url:string,initial:T) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [data, setData] = useState<T>(initial);
    const [code, setCode] = useState<number | null>(null);
    const {queryParameter} = useAppSelector((state:RootState)=>state.queryParameter)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        const fetchSearch = async () => {
            setIsPending(true);
            dispatch(chaneProgressTop(20))
            try {
                console.log()
                const encodedQuery = encodeURIComponent(JSON.stringify(queryParameter));
                const response = await axios.get<ApiResponse<T>>(`${createActionURL(url).requestParam([{key:'query',value:encodedQuery}])}`, { withCredentials: true });
                dispatch(chaneProgressTop(50))
                if (response.data.result !== undefined && response.data.result !== null) {
                    setData(response.data.result);
                }
                setCode(response.data.code);
                setError(null);
            } catch (err) {
                dispatch(chaneProgressTop(50))
                setData(initial)
                console.error(err);
                setError(err as AxiosError); // Kiểu AxiosError cho lỗi từ axios
            } finally {
                dispatch(chaneProgressTop(100))
                setIsPending(false);
            }
        };
        fetchSearch()
    },[dispatch,queryParameter])
    

    return { data, isPending, error, code };
};