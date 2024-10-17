'use client';
import SaveAction from "@/components/admin/common/SaveAction";
import ContentForm from "@/components/admin/product/productManage/ContentForm";
import { getObjectAsFiles } from "@/config/S3Config";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useEditAdmin } from "@/hooks/common/useEditAdmin";
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam";
import { useMultipart } from "@/hooks/common/useMultiPart";
import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut";
import { FormErrors } from "@/types/erros";
import { ProductDto, ProductEdit, ProductItemDto } from "@/types/product";
import { createActionURL } from "@/utils/commonUtils";
import { useParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

function EditProduction() {
    useAuthorizePage("products:edit")
    const { addItem, getMultipart } = useMultipart<File | Blob>()
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<FormData>();
    useEditAdmin({ code: codeSave, message: messageSave })
    const [productDto, setProductDto] = useState<ProductDto>()

    const params = useParams<{ id: string; }>()
    const {  initialById } = useGetDataByIdParam<ProductEdit>('products/form-edit', params?.id);
    useEffect(() => {
        if (initialById) {
            const hanldeInitialForm = async () => {
                const { productItems: initialProductItems = [], images: initialImages = [] } = initialById;
                const productItems = await Promise.all(
                    initialProductItems.map(async (productItem): Promise<ProductItemDto> => {
                        const productItemImages = await getObjectAsFiles(productItem.images);
                        return { ...productItem, images: productItemImages  };
                    })
                );
                const productImages = await getObjectAsFiles(initialImages);
                const productDto: ProductDto = {
                    ...initialById,
                    productItems,
                    images: productImages ,
                };
                setProductDto(productDto)
            }
            hanldeInitialForm()
        }
    }, [initialById])


    const handleSave = useCallback(async (data: ProductDto, setErrors: (errors: FormErrors) => void) => {
        if (isPendingSave) return;
        const dataToServer = structuredClone(data);
        const { images, ...productDto } = dataToServer;
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
            productItem.images = []
        });

        const json = JSON.stringify({ images: [], ...productDto });
        const blob = new Blob([json], {
            type: 'application/json'
        });
        addItem('productDto', blob)
        const formData = getMultipart();
        fetchPut(createActionURL('products').instant(), formData, setErrors);
    }, [fetchPut, isPendingSave,addItem,getMultipart])
    return (
        <>
            <SaveAction url={"products"} />
            {
                productDto && (
                    <ContentForm handleSendServer={handleSave} initialForm={productDto} />
                )
            }

        </>
    )
}
export default memo(EditProduction)