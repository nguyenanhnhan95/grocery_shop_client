'use client'
import { toastTopRight } from "@/config/toast";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { logoutUser } from "@/redux/slice/common/currentUser";
import { RootState } from "@/setting/store";
import { MESSAGE_SYSTEM_ERROR } from "@/utils/commonConstants";
import { createActionURL } from "@/utils/commonUtils";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect } from "react";

interface LogoutUserProps {
    headerUserModalRef: React.RefObject<HTMLDivElement>;
}
function LogoutUser({ headerUserModalRef }: LogoutUserProps) {
    const { fetchData, isPending, error, code } = useFetchData();
    const { authenticate } = useAppSelector((state: RootState) => state.currentUser);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleLogout = useCallback(() => {
        if (!isPending && authenticate === true) {
            fetchData(createActionURL("auth/logout").instant());
        }
    }, [isPending, authenticate, fetchData]);

    useEffect(() => {
        if (code === 200) {
            dispatch(logoutUser())
            if (headerUserModalRef?.current) {
                headerUserModalRef.current.style.display = 'none';
            }
            router.push("/");
        }
    }, [code, router, dispatch, handleLogout,headerUserModalRef]);

    useEffect(() => {
        if (error !== null) {
            console.log(error)
            toastTopRight.toastError(MESSAGE_SYSTEM_ERROR)
        }
    }, [error, router]);
    return (
        <div className="header-user-modal-item" onClick={handleLogout}><i className="fa-solid fa-power-off"></i>Đăng xuất</div>
    )
}
export default memo(LogoutUser)