'use client';
import { memo } from "react";
import logoAvatarUser from "./../../../public/image/logo_user_default.jpg"
import { RootState } from "@/setting/store";
import { useAppSelector } from "@/lib/redux";
import Image from "next/image";
interface AvatarUserHeaderProps {
    handleHeaderUserClick: () => void; 
  }
function AvatarUserHeader({ handleHeaderUserClick }: AvatarUserHeaderProps) {
    const {  authenticate, srcAvatar,errorAvatar } = useAppSelector((state:RootState) => state.currentUser)
    return (
        <>
            {authenticate === true && (
                <div className="header-user-item" onClick={handleHeaderUserClick}>
                    <Image src={(srcAvatar === null || errorAvatar !==null) ? logoAvatarUser : srcAvatar} alt="" />
                </div>

            )
            }
        </>
    )
}
export default memo(AvatarUserHeader);