'use client'
import { useAppDispatch } from "@/lib/redux";
import { actionCloseNotificationModal, actionShowNotificationModal } from "@/redux/action/actionShowNotificationModal";
import { handleNotificationModal } from "@/redux/slice/common/notificationModal";

import { useCallback } from "react";

const useNotificationModal = () => {
    const dispatch = useAppDispatch();

    const showNotificationModal  = useCallback((message:string, handleServiceRedirect:()=>void) => {

        dispatch(handleNotificationModal(actionShowNotificationModal(message, handleServiceRedirect)));

        const timeoutId = setTimeout(() => {
            dispatch(handleNotificationModal(actionCloseNotificationModal()));
            handleServiceRedirect();
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    return showNotificationModal ;
};
export default useNotificationModal;