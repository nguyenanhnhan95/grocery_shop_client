'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/shop/promotion/ContentForm";
import { initialForm, InitialForm } from "@/components/admin/shop/promotion/initialConfig";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useSaveAdmin } from "@/hooks/common/useSaveAdmin";
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useCallback } from "react";

function AddPromotion() {
    useAuthorizePage("shop-promotion:add")
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost<InitialForm>();
    useSaveAdmin({ code: codeSave, message: messageSave })
    const handleSave = useCallback(async (data: InitialForm, setErrors: (errors: any) => void)=> {
        if(isPendingSave) return;
            fetchPost(createActionURL("shop-promotion").instant(), data, setErrors)
    }, [fetchPost, ])
    return (
        <>
            <SaveAction url={"shop-promotion"} />
            <ContentForm handleSendServer={handleSave}  initialForm={initialForm} />
        </>
    )
}
export default memo(AddPromotion)