'use client'
import { useRouter } from "next/navigation";
import { memo } from "react";

function RedirectAdmin() {

    const router = useRouter();


    return (
        <>
            <div className="header-user-modal-item" onClick={() => router.push("/admin")}>
                <i className="fa-solid fa-users"></i>Quản lý nhân sự
            </div>
        </>
    )
}
export default memo(RedirectAdmin)