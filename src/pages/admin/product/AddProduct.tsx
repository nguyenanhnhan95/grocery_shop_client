'use client';

import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/product/productManage/ContentForm";
import { initialForm } from "@/components/admin/product/productManage/initialConfig";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useMultipart } from "@/hooks/common/useMultiPart";
import { useSaveAdmin } from "@/hooks/common/useSaveAdmin";
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost";
import { FormErrors } from "@/types/erros";
import { ProductDto, ProductItemDto } from "@/types/product";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useCallback } from "react";

function  AddProduction() {
    useAuthorizePage("products:add")
    const { addItem, getMultipart } = useMultipart<File|Blob>()
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost<FormData>();
    useSaveAdmin({ code: codeSave, message: messageSave })
    const handleSave = useCallback(async (data: ProductDto, setErrors: (errors: FormErrors) => void) => {
        if (isPendingSave) return;
        const dataToServer = structuredClone(data);
        const { images,  ...productDto } = dataToServer;
        const appendFilesToFormData = (key: string, files: File[] | undefined) => {
            if (files && files.length > 0) {
                files.forEach((file: File) => {
                    addItem(key, file);
                });
            }
        };
        appendFilesToFormData('product', images);
        productDto.productItems.forEach((productItem: ProductItemDto, index: number) => {
            appendFilesToFormData(`productItems[${index}].images`, productItem.images);     
            productItem.images=[]
        });
        const json = JSON.stringify({images:[],...productDto});
        const blob = new Blob([json], {
            type: 'application/json'
        });
        addItem('productDto', blob)
        const formData = getMultipart();
        fetchPost(createActionURL('products').instant(), formData, setErrors);
    }, [fetchPost, isPendingSave,getMultipart,addItem])
    return (
        <>
            <SaveAction url={"products"} />
            <ContentForm handleSendServer={handleSave} initialForm={initialForm} />
        </>
    )
}
export default memo(AddProduction)