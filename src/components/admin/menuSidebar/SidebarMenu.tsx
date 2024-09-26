'use client'
import { useCallback, useEffect, useRef } from "react";
import logoBrand from "./../../../../public/image/logo-sky.png"
import ContentSideBarMenu from "./ContentSideBarMenu"
import "./styles/menuSidebar.css"
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { onClickMenuAdminRef } from "@/redux/slice/admin/overPlayMenu";
import { RootState } from "@/setting/store";
function SidebarMenu() {
    const isOpen = useAppSelector((state: RootState) => state.overPlayMenuMain.open)
    const menuAdminRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const handleClickOutsideMenuAdmin = useCallback((target: EventTarget | null) => {
        return !!(menuAdminRef.current && menuAdminRef.current.contains(target as Node));
    }, []);

    useEffect(() => {
        dispatch(onClickMenuAdminRef(handleClickOutsideMenuAdmin));
    }, [dispatch, handleClickOutsideMenuAdmin]);
    return (
        <div className={`main-menu  menu-fixed menu-light menu-accordion menu-shadow menu-native-scroll expanded ${isOpen ? `open` : ``}`} ref={menuAdminRef} >
            <div className="row main-menu-logo">
                <div className="col-8">
                    <div className="menu-logo">
                        <img src={logoBrand.src} alt="logo T&H" />
                    </div>
                </div>
                {/* <div className="col-4 close-overPlay">
                    <i className="fa-solid fa-xmark " onClick={() => dispatch(onClickHandleOverPlay(false))}></i>
                </div> */}
            </div>
            <ContentSideBarMenu />

        </div>
    )
}
export default SidebarMenu
