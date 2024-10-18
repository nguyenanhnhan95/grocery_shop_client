'use client'
import { useState } from "react"
import  Cookies from 'js-cookie';
export const useCookies = (key: string) => {
    const [data, setData] = useState<string | undefined>(() => {
        // Chỉ đọc cookie từ phía client
        if (typeof window !== "undefined") {
            return Cookies.get(key);  // Kiểm tra nếu code đang chạy trên client
        }
        return undefined;  // Nếu không phải client, không đọc cookie
    });

    const setCookie = (value: string, options?: Cookies.CookieAttributes) => {
        if (typeof window !== "undefined") {
            Cookies.set(key, value, options);  // Thiết lập cookie chỉ trên client
            setData(value);
        }
    };

    const removeCookie = () => {
        if (typeof window !== "undefined") {
            Cookies.remove(key);  // Xóa cookie chỉ trên client
            setData(undefined);
        }
    };
    return {data, setCookie, removeCookie} ;
}