'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/shop/promotion/ContentForm";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useEditAdmin } from "@/hooks/common/useEditAdmin";
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";


import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { FormErrors } from "@/types/erros";
import { Promotion, PromotionDto } from "@/types/promotion";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback } from "react";

function EditPromotion() {
    useAuthorizePage("shop-promotion:edit")
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<PromotionDto>();
    useEditAdmin({ code: codeSave, message: messageSave })
    const params = useParams<{ id: string; }>()
    const {  initialById } = useGetDataByIdParam<Promotion>('shop-promotion', params?.id);
    const handleSave = useCallback(async (data: PromotionDto, setErrors: (errors: FormErrors) => void) => {
        if (isPendingSave || !params?.id) return;
        fetchPut(createActionURL('shop-promotion').pathVariable(params.id), data, setErrors)
    }, [fetchPut,isPendingSave,params?.id])
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