import type { Metadata } from "next";
import StoreProvider from "../StoreProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./../../styles/globals.css"
import Header from "@/components/header/Header";
import React from "react";
import { cookies } from "next/headers";
import { COOKIE_THEME, SCREEN_MODE } from "@/utils/commonConstants";


export const metadata: Metadata = {
  title: "Smart Sky",
  description: "Cửa hàng tạp hóa online",
};

export default  function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const cookieStore = cookies()
  const screenMode=cookieStore.get(COOKIE_THEME)?.value || SCREEN_MODE.light;
  return (
    <html lang="vi" dark-theme={screenMode}>
      <body suppressHydrationWarning={true} >
        {/* <ScreenTheme screenMode={'dark'}> */}

        <StoreProvider>

          <Header  />
          {children}
        </StoreProvider>
        {/* </ScreenTheme> */}
      </body>
    </html>

  );
}
