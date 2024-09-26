'use client'
import { memo } from "react"
import { useSelector } from "react-redux"
import logoAvatarUser from "./../../../public/image/logo_user_default.jpg"
import { RootState } from "@/setting/store"

function InformationUserModel() {
    const { user, srcAvatar, errorAvatar } = useSelector((state:RootState) => state.currentUser)
    return (
        <div className="d-flex justify-content-start header-user-modal-item">
            <div className="header-user-modal-item-image">
                <img src={srcAvatar === null || errorAvatar !== null ? logoAvatarUser.src : srcAvatar} alt="" />
            </div>
            <div className=" header-user-modal-item-name">
                {user?.name}
            </div>
        </div>
    )
}
export default memo(InformationUserModel)