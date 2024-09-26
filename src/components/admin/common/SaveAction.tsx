'use client'
import "./styles/saveAction.css"
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { actionSave } from "@/redux/slice/admin/buttonSaveSlice";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

function SaveAction(url: { url: string }) {
    const { onClickAction } = useAppSelector((state) => state.actionAdmin)
    const dispatch = useAppDispatch();
    const router = useRouter()
    const handleSaveClose =useCallback( (close: boolean) => {
        if (onClickAction) {
            onClickAction.click()
            dispatch(actionSave({ close: close }))
        }
    },[onClickAction,dispatch])
    const handleClose =useCallback( () => {
        router.push(`/admin/${url}`)
    },[url])
    return (
        <>
            <div className="main-content-action-save">
                <div className="container-fluid container-content-action-save">
                    <div className="d-flex justify-content-start align-items-center">
                        <button type="button" className="content-action-save-button"
                            onClick={() => handleSaveClose(false)}><i className="fa-solid fa-floppy-disk" />Lưu</button>
                        <button type="button" className="content-action-save-button" onClick={() => handleSaveClose(true)}>
                            <i className="fa-solid fa-floppy-disk" />Lưu và Đóng</button>
                        <button type="button" className="content-action-save-button" onClick={handleClose}>
                            <i className="fa-solid fa-xmark" />Đóng</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default memo(SaveAction)