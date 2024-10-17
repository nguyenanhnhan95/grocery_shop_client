'use client';
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/product/variationOption/ContentForm";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useEditAdmin } from "@/hooks/common/useEditAdmin";
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";
import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { FormErrors } from "@/types/erros";
import { VariationOptionDto } from "@/types/product";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback } from "react";

function EditVariationOption() {
    useAuthorizePage("option-variation:edit")
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<VariationOptionDto>();
    useEditAdmin({ code: codeSave, message: messageSave })
    const params = useParams<{ id: string; }>()
    const { initialById } = useGetDataByIdParam<VariationOptionDto>('option-variation', params?.id);
    const handleSave = useCallback(async (data: VariationOptionDto, setErrors: (errors: FormErrors) => void) => {
        if (isPendingSave || !params?.id) return;
        fetchPut(createActionURL('option-variation').pathVariable(params.id), data, setErrors)
    }, [fetchPut,isPendingSave,params?.id])
    return (
        <>
            <SaveAction url={"option-variation"} />{
                initialById && (
                    <ContentForm handleSendServer={handleSave} initialForm={initialById} />
                )
            }
        </>
    )
}
export default memo(EditVariationOption)