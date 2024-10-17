'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/product/variation/ContentForm";
import { initialForm } from "@/components/admin/product/variation/initialConfig";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useSaveAdmin } from "@/hooks/common/useSaveAdmin";
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost";
import { FormErrors } from "@/types/erros";
import { VariationDto } from "@/types/product";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useCallback } from "react";

function AddVariation() {
    useAuthorizePage("variation:add")
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost<VariationDto>();
    useSaveAdmin({ code: codeSave, message: messageSave })
    const handleSave = useCallback(async (data: VariationDto, setErrors: (errors: FormErrors) => void)=> {
        if(isPendingSave) return;
            fetchPost(createActionURL("variation").instant(), data, setErrors)
    }, [fetchPost,isPendingSave ])
    return (
        <>
            <SaveAction url={"variation"} />
            <ContentForm handleSendServer={handleSave}  initialForm={initialForm} />
        </>
    )
}
export default memo(AddVariation)