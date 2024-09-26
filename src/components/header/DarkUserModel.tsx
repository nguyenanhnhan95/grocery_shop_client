'use client'
import { useScreenMode } from "@/hooks/common/useScreenMode";
import { useFetchPatch } from "@/hooks/fetch-authencation/useFetchPatch";
import {  useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { EMPTY_STRING, ICON_CHECK, SCREEN_THEME, SCREEN_THEME_MODE, SCREEN_THEME_NAME, WHITE_SPACE } from "@/utils/commonConstants";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useCallback, useEffect, useState } from "react";

function DarkUserModel() {
    const [show, setShow] = useState<boolean>(false)
    const { user } = useAppSelector((state: RootState) => state.currentUser)
    const { screenMode } = useScreenMode()
    const { fetchPatch, isPending, code } = useFetchPatch()
    const handleShowMode = () => {
        setShow(!show)

    }
    const handleScreenCheck = (modeScreen: string) => {
        return user?.screenTheme === modeScreen ? ICON_CHECK : EMPTY_STRING;
    }
    useEffect(()=>{
        if(code===200){
            window.location.reload()
        }
    },[code])
    const handleChangeScreenMode =useCallback( (modeScreen: string) => {
        if (user !== null && isPending !== true && screenMode !== modeScreen) {
            fetchPatch(createActionURL('profile/change-dark').pathVariable(`${user?.id}`), { 'id':user?.id,'screenTheme':modeScreen})
        }
    },[user,isPending,screenMode,fetchPatch])
    return (
        <div className={`header-user-modal-item-dark ${show ? `show` : ``}`}>
            <div className="header-user-modal-item parent" onClick={handleShowMode}>
                <i className="fa-solid fa-moon" />Chế độ :{WHITE_SPACE}
                {user?.screenTheme === SCREEN_THEME_MODE.SCREEN_LIGHT.alias ? (SCREEN_THEME_MODE.SCREEN_LIGHT.name) : (SCREEN_THEME_MODE.SCREEN_DARK.name)}
            </div>
            <div className="header-user-modal-item" onClick={() => handleChangeScreenMode(SCREEN_THEME_MODE.SCREEN_LIGHT.alias)}>
                <i className={handleScreenCheck(SCREEN_THEME_MODE.SCREEN_LIGHT.alias)} />{SCREEN_THEME_NAME} : {SCREEN_THEME_MODE.SCREEN_LIGHT.name}
            </div>
            <div className="header-user-modal-item" onClick={() => handleChangeScreenMode(SCREEN_THEME_MODE.SCREEN_DARK.alias)}>
                <i className={handleScreenCheck(SCREEN_THEME_MODE.SCREEN_DARK.alias)} />{SCREEN_THEME_NAME} : {SCREEN_THEME_MODE.SCREEN_DARK.name}
            </div>
        </div>
    )
}
export default memo(DarkUserModel)