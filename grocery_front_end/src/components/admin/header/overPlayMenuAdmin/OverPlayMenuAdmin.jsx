import { memo } from "react";
import { useDispatch } from "react-redux";
import { onClickHandleOverPlay } from "../../../../slice/main/overPlayMenu";

function OverPlayMenuAdmin() {
    const dispatch = useDispatch();
    const handleOpenMenuMainOnClick = () => {
        dispatch(onClickHandleOverPlay(true))
    }
    
    return (
        <li className="nav-item main-content-header-list" >
            <i className="fa-solid fa-bars " onClick={handleOpenMenuMainOnClick}></i>
        </li>
    )
}
export default memo(OverPlayMenuAdmin)