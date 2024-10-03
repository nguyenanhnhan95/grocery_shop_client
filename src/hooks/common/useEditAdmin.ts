'use client'
import { toastTopRight } from "@/config/toast";
import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { useCallback, useEffect } from "react";

export const useEditAdmin = (props: { code: number | null, message: string | null }) => {
    const { funcClose } = useAppSelector((state: RootState) => state.actionAdmin)
    const hanldeSave = useCallback(() => {
        if (props.code == 200 && props.message) {          
            if (funcClose) {
                funcClose();
            }
            toastTopRight.toastSuccess(props.message)
        }
    }, [props.code, props.message])
    useEffect(() => {
        hanldeSave()
    }, [hanldeSave])
}