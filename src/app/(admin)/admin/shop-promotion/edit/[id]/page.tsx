'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/shop/promotion/ContentForm";
import { InitialForm } from "@/components/admin/shop/promotion/initialConfig";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useEditAdmin } from "@/hooks/common/useEditAdmin";
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";


import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback, useEffect } from "react";

function EditPromotion() {
    useAuthorizePage("shop-promotion:edit")
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<InitialForm>();
    useEditAdmin({ code: codeSave, message: messageSave })
    const params = useParams<{ id: string; }>()
    const { isPendingById, initialById, codeById } = useGetDataByIdParam<InitialForm>('shop-promotion', params?.id);
    const handleSave = useCallback(async (data: InitialForm, setErrors: (errors: any) => void) => {
        if (isPendingSave || !params?.id) return;
        fetchPut(createActionURL('shop-promotion').pathVariable(params.id), data, setErrors)
    }, [fetchPut])
    return (
        <>
            <SaveAction url={"shop-promotion"} />{
                initialById && (
                    <ContentForm handleSendServer={handleSave} initialForm={initialById} />
                )
            }
        </>
    )
}
export default memo(EditPromotion)