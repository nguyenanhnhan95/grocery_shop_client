'use client'
import { memo } from "react";
import DarkUserModel from "./DarkUserModel";
import InformationUserModal from "./InformationUserModal";
import LogoutUser from "./LogoutUser";
import RedirectAdmin from "./RedirectAdmin";
interface HeaderUserModelProps{
    headerUserModalRef: React.RefObject<HTMLDivElement>,
    isModalUserVisible:boolean
}
function HeaderUserModel({ headerUserModalRef, isModalUserVisible }: HeaderUserModelProps) {


    return (
        <div className="header-user-modal" style={{ display: isModalUserVisible ? 'block' : 'none' }} ref={headerUserModalRef}>
            <InformationUserModal  />
            <hr />
            <div className="header-user-modal-item"><i className="fa-solid fa-user-gear"></i>Cập nhập tài khoản</div>
            <DarkUserModel />
            <RedirectAdmin />
            <LogoutUser headerUserModalRef={headerUserModalRef} />
        </div>
    )
}
export default memo(HeaderUserModel)