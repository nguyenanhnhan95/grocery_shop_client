'use client';
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/product/variationOption/ContentForm";
import { initialForm} from "@/components/admin/product/variationOption/initialConfig";

import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useSaveAdmin } from "@/hooks/common/useSaveAdmin";
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost";
import { FormErrors } from "@/types/erros";
import { VariationOptionDto } from "@/types/product";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useCallback } from "react";

function AddOptionVariation() {
    useAuthorizePage("option-variation:add")
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost<VariationOptionDto>();
    useSaveAdmin({ code: codeSave, message: messageSave })
    const handleSave = useCallback(async (data: VariationOptionDto, setErrors: (errors: FormErrors) => void) => {
        if (isPendingSave) return;
        fetchPost(createActionURL("option-variation").instant(), data, setErrors)
    }, [fetchPost, isPendingSave])
    return (
        <>
            <SaveAction url={"option-variation"} />
            <ContentForm handleSendServer={handleSave} initialForm={initialForm} />
        </>
    )
}
export default memo(AddOptionVariation)