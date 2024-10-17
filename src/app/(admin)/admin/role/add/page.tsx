'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/system/role/ContentForm";
import { initialForm } from "@/components/admin/system/role/initialConfig";
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useCallback } from "react";
import "@/components/admin/system/role/styles/contentForm.css"
import { useSaveAdmin } from "@/hooks/common/useSaveAdmin";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { RoleDto } from "@/types/role";
import { FormErrors } from "@/types/erros";
function AddRole() {
    useAuthorizePage("role:add")
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost<RoleDto>();
    useSaveAdmin({ code: codeSave, message: messageSave })
    
    const handleSave = useCallback(async (data: RoleDto, setErrors: (errors: FormErrors) => void)=> {
        if(isPendingSave) return;
            fetchPost(createActionURL("role").instant(), data, setErrors)
    }, [fetchPost,isPendingSave ])
    return (
        <>
            <SaveAction url={"role"} />
            <ContentForm handleSendServer={handleSave}  initialForm={initialForm} />
        </>
    )
}
export default memo(AddRole)