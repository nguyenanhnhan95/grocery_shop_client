'use client'
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { onClickHandleOverPlay } from "@/redux/slice/admin/overPlayMenu";
import { memo, useCallback, useEffect, useRef } from "react";

function OverPlayMenuAdmin() {
    const dispatch = useAppDispatch();
    const openMenuRef = useRef<HTMLLIElement>(null)
    const clickMenuAdminRef = useAppSelector(state => state.overPlayMenuMain.clickMenuAdminRef)
    
    const handleOpenMenuMainOnClick =useCallback( (open:boolean) => {
        dispatch(onClickHandleOverPlay(open))
    },[dispatch])
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
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
    }, [clickMenuAdminRef,openMenuRef,handleOpenMenuMainOnClick]);
    return (
        <li className="nav-item main-content-header-list"  ref={openMenuRef}>
            <i className="fa-solid fa-bars " ></i>
        </li>
    )
}
export default memo(OverPlayMenuAdmin)