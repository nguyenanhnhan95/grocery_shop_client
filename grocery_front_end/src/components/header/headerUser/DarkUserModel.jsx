import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_SCREEN_THEME_REQUEST_PARAM, EMPTY_STRING, ICON_CHECK, linkHttp, SCREEN_THEME_MODE, SCREEN_THEME_NAME, SLASH, WHITE_SPACE } from "../../../utils/commonConstants";
import { createHeader } from "../../../utils/commonUtils";
import axios from "axios";
import { updateProfile } from "../../../slice/person/profile";

function DarkUserModel() {
    const [show, setShow] = useState(false)
    const { profile } = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const handleShowMode = () => {
        setShow(!show)

    }
    const handleScreenCheck = (modeScreen) => {
        return profile?.screenTheme === modeScreen ? ICON_CHECK : EMPTY_STRING;
    }
    const handleChangeScreenMode = async (modeScreen) => {
        try {
            const newProfile = { ...profile, screenTheme: modeScreen }
            dispatch(updateProfile({ profile: newProfile }));
            await axios.patch(`${linkHttp.getProfile}${SLASH}${CHANGE_SCREEN_THEME_REQUEST_PARAM}`, newProfile, createHeader());
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={`header-user-modal-item-dark ${show ? `show` : ``}`}>
            <div className="header-user-modal-item parent" onClick={handleShowMode}>
                <i className="fa-solid fa-moon" />Chế độ :{WHITE_SPACE}
                {profile?.screenTheme === SCREEN_THEME_MODE.SCREEN_LIGHT.alias ? (SCREEN_THEME_MODE.SCREEN_LIGHT.name) : (SCREEN_THEME_MODE.SCREEN_DARK.name)}
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