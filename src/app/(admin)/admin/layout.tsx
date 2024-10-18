


import "./../../../styles/globals.css"
import "./../../../styles/colors.min.css"
import "./../../../../src/styles/contentAdmin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import "./../../../src/styles/colors.min.css";

import { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";
import React from "react";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "HỆ THỐNG QUẢN LÝ - Tạp Hóa T&N",
  description: "Cửa hàng tạp hóa online",
};
const Admin = dynamic(() => import('@/pages/admin/Admin'), {
  loading: () => <LoadingPage />, // Hiển thị loading trong khi chờ load component
  ssr: false, // Không sử dụng server-side rendering cho component này
});
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies()
  const screenMode = cookieStore.has('theme')

  return (
    <html lang="vi" dark-theme={screenMode}>
      <body suppressHydrationWarning={true} >
        <Admin>
          {children}
        </Admin>
      </body>
    </html>

  );
}