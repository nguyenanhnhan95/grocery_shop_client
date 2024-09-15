'use client';
import { useAppSelector } from "@/lib/redux";
import { onClickHandleOverPlay } from "@/redux/slice/admin/overPlayMenu";
import { RootState } from "@/setting/store";
import { memo, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";


function OverPlayMenuAdmin() {
    const dispatch = useDispatch();
    const openMenuRef = useRef<HTMLDivElement | null>(null);
    const handleOpenMenuMainOnClick = useCallback((open:boolean) => {
        dispatch(onClickHandleOverPlay(open))
    },[dispatch,onClickHandleOverPlay])
    const clickMenuAdminRef = useAppSelector((state:RootState) => state.overPlayMenuMain.clickMenuAdminRef)
    useEffect(() => {
        function handleClickOutside(event:MouseEvent) {
            try {
                if (openMenuRef.current && clickMenuAdminRef) {
                    if (!clickMenuAdminRef(event.target)) {
                        if (!openMenuRef.current.contains(event.target as Node)) {
                            handleOpenMenuMainOnClick(false)
                        } else {
                            handleOpenMenuMainOnClick(true)
                        }
                    }
                }
            } catch (error) {
                console.error(error)
            }

        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [clickMenuAdminRef,handleOpenMenuMainOnClick]);
    return (
        <li className="nav-item main-content-header-list" >
            <i className="fa-solid fa-bars " ref={openMenuRef} ></i>
        </li>
    )
}
export default memo(OverPlayMenuAdmin)