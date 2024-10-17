import type { Metadata } from "next";
import StoreProvider from "../StoreProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./../../styles/globals.css"
import { fetchModeScreen, fetchProductCategories } from "@/utils/fetchData";
import Header from "@/components/header/Header";
import React from "react";


export const metadata: Metadata = {
  title: "Smart Sky",
  description: "Cửa hàng tạp hóa online",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const [productCategoryMenus, screenMode] = await Promise.all([
    fetchProductCategories(),
    fetchModeScreen()

  ]);

  return (
    <html lang="vi" dark-theme={screenMode}>
      <body suppressHydrationWarning={true} >
        {/* <ScreenTheme screenMode={'dark'}> */}

        <StoreProvider>

          <Header productCategoryMenus={productCategoryMenus} />
          {children}
        </StoreProvider>
        {/* </ScreenTheme> */}
      </body>
    </html>

  );
}
