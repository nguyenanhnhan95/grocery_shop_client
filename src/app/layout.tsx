import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import NotificationModal from "@/components/composite/modal/NotificationModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/globals.css"
export const metadata: Metadata = {
  title: "Smart Sky",
  description: "Cửa hàng tạp hóa online",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <StoreProvider>
          {children}
          <NotificationModal />
        </StoreProvider>
      </body>
    </html>

  );
}
