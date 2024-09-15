import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { EMPTY_STRING, ICON_CHECK, SCREEN_THEME, SCREEN_THEME_MODE, SCREEN_THEME_NAME, WHITE_SPACE } from "@/utils/commonConstants";
import { memo, useState } from "react";

function DarkUserModel() {
    const [show, setShow] = useState<boolean>(false)
    const { user } = useAppSelector((state:RootState) => state.currentUser)
    const dispatch = useAppDispatch();
    const handleShowMode = () => {
        setShow(!show)

    }
    const handleScreenCheck = (modeScreen:string) => {
        return user?.screenTheme === modeScreen ? ICON_CHECK : EMPTY_STRING;
    }
    const changeScreenTheme = (theme:string) => {
        if (theme === SCREEN_THEME_MODE.SCREEN_DARK.alias) {
            console.log(theme)
            localStorage.setItem(SCREEN_THEME, SCREEN_THEME_MODE.SCREEN_DARK.alias);
        } else {
            localStorage.setItem(SCREEN_THEME, SCREEN_THEME_MODE.SCREEN_LIGHT.alias);
        }
    
    }
    const handleChangeScreenMode = async (modeScreen:string) => {
        // try {
        //     changeScreenTheme(modeScreen)
        //     const newUser = { ...user, screenTheme: modeScreen }
        //     await axios.patch(`${LINK_USER.getProfile}${SLASH}${CHANGE_SCREEN_THEME_REQUEST_PARAM}`, newUser, { withCredentials: true });
        //     dispatch(updateUser({ user: newUser }));

        // } catch (error) {
        //     console.log(error)
        // }
    }
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