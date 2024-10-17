'use client'
import StoreProvider from "@/app/StoreProvider";
import HeaderAdmin from "@/components/admin/header/HeaderAdmin";
import SidebarMenu from "@/components/admin/menuSidebar/SidebarMenu";
import { useAuthAdminPage } from "@/hooks/auth/useAuthAdminPage";
import React from "react";


function Admin({ children }: { children: React.ReactNode }) {
    const{code} = useAuthAdminPage('dash-board:view')
    if(code!==200){
        return;
    }
    return (
        <StoreProvider>
            <div className='container-fluid container-main d-flex m-0 p-0' >
                <SidebarMenu />
                <div className="main-content">
                    <HeaderAdmin />
                    {children}
                </div>
            </div>
        </StoreProvider>
    )
}
export default Admin;