import { fetchModeScreen } from "@/utils/fetchData";
import StoreProvider from "../StoreProvider";
import SidebarMenu from "@/components/admin/menuSidebar/SidebarMenu";
import "./../../styles/globals.css"
import "./../../../src/styles/contentAdmin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import "./../../../src/styles/colors.min.css";
import HeaderAdmin from "@/components/admin/header/HeaderAdmin";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HỆ THỐNG QUẢN LÝ - Tạp Hóa T&N",
  description: "Cửa hàng tạp hóa online",
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const screenMode = await fetchModeScreen();
  return (
    <html lang="vi" dark-theme={screenMode}>
      <body suppressHydrationWarning={true} >
        {/* <ScreenTheme screenMode={'dark'}> */}

        <StoreProvider>
          <div className='container-fluid container-main d-flex m-0 p-0' >
            <SidebarMenu />
            <div className="main-content">
              <HeaderAdmin />
              {children}
            </div>
          </div>
        </StoreProvider>
        {/* </ScreenTheme> */}
      </body>
    </html>

  );
}