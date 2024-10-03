'use client'
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/system/role/ContentForm";
import { InitialForm } from "@/components/admin/system/role/initialConfig";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback, useEffect } from "react";
import "@/components/admin/system/role/styles/contentForm.css"
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";
function EditRole(){
    useAuthorizePage("role:edit")
    const params = useParams<{ id: string }>();
    const { isPendingById, initialById, codeById } = useGetDataByIdParam<InitialForm>('role',params?.id);
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<InitialForm>();
   
    const handleSave = useCallback(async (data: InitialForm, setErrors: (errors: any) => void)=> {
        if(isPendingSave || !params?.id) return;
            fetchPut(createActionURL("role").pathVariable(params.id), data, setErrors)
    }, [fetchPut])
    console.log(initialById)
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