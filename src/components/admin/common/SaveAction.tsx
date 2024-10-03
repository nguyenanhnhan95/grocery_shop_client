'use client'
import "./styles/saveAction.css"
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { actionSave, setFuncClose } from "@/redux/slice/admin/buttonSaveSlice";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect } from "react";

function SaveAction(props: { url: string }) {
    const { onClickActionId, close } = useAppSelector((state) => state.actionAdmin)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleClose = useCallback(() => {
        router.push(`/admin/${props.url}`)
    }, [props.url])
    useEffect(() => {
        dispatch(setFuncClose(handleClose))
    }, [dispatch, handleClose])
    const handleSaveClose = useCallback((close: boolean) => {
        if (onClickActionId) {
            const button = document.getElementById(onClickActionId) as HTMLButtonElement;
            if (button) {
                button.click();
            }
            dispatch(actionSave(close));
        }
    }, [onClickActionId, dispatch])

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