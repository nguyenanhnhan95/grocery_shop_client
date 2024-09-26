'use client';
import { memo } from "react";
import logoAvatarUser from "./../../../public/image/logo_user_default.jpg"
import { RootState } from "@/setting/store";
import { useAppSelector } from "@/lib/redux";
interface AvatarUserProps {
    handleHeaderUserClick: () => void; 
  }
function AvatarUser({ handleHeaderUserClick }: AvatarUserProps) {
    const {  authenticate, srcAvatar,errorAvatar } = useAppSelector((state:RootState) => state.currentUser)
    return (
        <>
            {authenticate === true && (
                <div className="header-user-item" onClick={handleHeaderUserClick}>
                    <img src={(srcAvatar === null || errorAvatar !==null) ? logoAvatarUser.src : srcAvatar} alt="" />
                </div>

            )
            }
        </>
    )
}
export default memo(AvatarUser);