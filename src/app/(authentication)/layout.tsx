import StoreProvider from "@/app/StoreProvider";
import { Metadata } from "next";

import 'bootstrap/dist/css/bootstrap.min.css';
import './../../styles/globals.css'
import './../../styles/colors.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
export const metadata: Metadata = {
    title: "Đang nhập - Tạp Hóa T&N",
    description: "Trang đăng nhập",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <html lang="en">
            <body suppressHydrationWarning={true} >
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}