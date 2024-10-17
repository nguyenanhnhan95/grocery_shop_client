'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/product/variation/ContentForm";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useEditAdmin } from "@/hooks/common/useEditAdmin";
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";
import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { FormErrors } from "@/types/erros";
import { Variation, VariationDto } from "@/types/product";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback } from "react";

function EditVariation() {
    useAuthorizePage("variation:edit")
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<VariationDto>();
    useEditAdmin({ code: codeSave, message: messageSave })
    const params = useParams<{ id: string; }>()
    const { initialById } = useGetDataByIdParam<Variation>('variation', params?.id);
    const handleSave = useCallback(async (data: VariationDto, setErrors: (errors: FormErrors) => void) => {
        if (isPendingSave || !params?.id) return;
        fetchPut(createActionURL('variation').pathVariable(params.id), data, setErrors)
    }, [fetchPut,isPendingSave,params?.id])
    return (
        <>
            <SaveAction url={"variation"} />{
                initialById && (
                    <ContentForm handleSendServer={handleSave} initialForm={initialById} />
                )
            }
        </>
    )
}
export default memo(EditVariation)