'use client'
import { useState } from "react"
import  Cookies from 'js-cookie';
export const useCookies = (key: string) => {
    const [data, setData] = useState<string | undefined>(() => {
        // Initialize the state with the cookie value if it exists
        return Cookies.get(key);
    });
    const setCookie = (value: string, options?: Cookies.CookieAttributes) => {
        Cookies.set(key, value, options);
        setData(value);
    };
    const removeCookie = () => {
        Cookies.remove(key);
        setData(undefined);
    };
    return [data, setCookie, removeCookie] as const;
}