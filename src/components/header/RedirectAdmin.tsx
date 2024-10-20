'use client'
import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { ROLES } from "@/utils/commonConstants";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

function RedirectAdmin() {
    const [permissionAdmin,setPermissionAdmin] = useState<boolean>(false)
    const router = useRouter();
    const { user, authenticate } = useAppSelector((state: RootState) => state.currentUser)
    useEffect(()=>{
        if(authenticate && !user?.roles.includes(ROLES.ROLE_USER)){
            setPermissionAdmin(true)
        }
    },[user,authenticate])
    if(!permissionAdmin){
        return<></>
    }
    return (
        <>
            <div className="header-user-modal-item" onClick={() => router.push("/admin")}>
                <i className="fa-solid fa-users"></i>Quản lý nhân sự
            </div>
        </>
    )
}
export default memo(RedirectAdmin)