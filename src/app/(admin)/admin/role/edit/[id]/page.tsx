'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/system/role/ContentForm";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";

import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback } from "react";
import "@/components/admin/system/role/styles/contentForm.css"
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";
import { useEditAdmin } from "@/hooks/common/useEditAdmin";
import { RoleDto } from "@/types/role";
import { FormErrors } from "@/types/erros";
function EditRole(){
    useAuthorizePage("role:edit")
    const params = useParams<{ id: string }>();
    const {  initialById } = useGetDataByIdParam<RoleDto>('role',params?.id);
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<RoleDto>();
    useEditAdmin({ code: codeSave, message: messageSave })
    const handleSave = useCallback(async (data: RoleDto, setErrors: (errors: FormErrors) => void)=> {
        if(isPendingSave || !params?.id) return;
            fetchPut(createActionURL("role").pathVariable(params.id), data, setErrors)
    }, [fetchPut,isPendingSave,params?.id])

    return(
        <>
        <SaveAction url={"role"} />
        {initialById &&
            <ContentForm handleSendServer={handleSave}  initialForm={initialById} />
        }
    </>
    )
}
export default memo(EditRole)