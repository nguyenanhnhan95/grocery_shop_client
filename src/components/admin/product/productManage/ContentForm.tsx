import CKEditorField from "@/components/composite/form/CKEditorField";
import CustomInput from "@/components/composite/form/CustomInput";
import InputCustomAdornment from "@/components/composite/form/InputAdornment";
import SelectForm from "@/components/composite/form/SelectForm";
import UploadImage from "@/components/composite/form/UploadImage";
import { useButtonSave } from "@/hooks/common/useButtonSave";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { handleKeyDownNumber } from "@/lib/eventInput";
import { FormErrors } from "@/types/erros";
import { ProductCategory, ProductDto, Variation, VariationOption } from "@/types/product";
import { Promotion } from "@/types/promotion";
import { LOADING_CONTENT_FORM,  VND } from "@/utils/commonConstants";
import { createActionURL } from "@/utils/commonUtils";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import { memo, useEffect } from "react";
import * as yup from "yup";
interface propsContentFormVariation {
    initialForm: ProductDto,
    handleSendServer: (
        data: ProductDto,
        setErrors: (errors: FormErrors) => void
    ) => Promise<void>;
}
function ContentForm({ initialForm, handleSendServer }: propsContentFormVariation) {
    const { idButtonSave, buttonRef } = useButtonSave();
    const { fetchData: fetchVariations, data: variations, isPending: isPendingVariations } = useFetchData<Variation[]>();
    const { fetchData: fetchVariationOptions, data: variationOptions, isPending: isPendingVariationOptions } = useFetchData<VariationOption[]>();
    const { fetchData: fetchProductCategories, data: productCategories, isPending: isPendingProductCategories } = useFetchData<ProductCategory[]>();
    const { fetchData: fetchPromotions, data: promotions, isPending: isPendingPromotions } = useFetchData<Promotion[]>();
    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchVariations(createActionURL("variation").instant()),
                fetchVariationOptions(createActionURL("option-variation").instant()),
                fetchProductCategories(createActionURL("product-category/children").instant()),
                fetchPromotions(createActionURL("shop-promotion").instant())
            ]);
        };
        fetchAllData();
    }, [fetchVariations, fetchVariationOptions, fetchProductCategories, fetchPromotions])
    return (
        <div className={isPendingProductCategories || isPendingPromotions || isPendingVariationOptions || isPendingVariations ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-product main-content-form">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        images: initialForm.images,
                        name: initialForm.name,
                        brand: initialForm.brand,
                        productCategory: initialForm.productCategory,
                        variation:  initialForm.variation,
                        description: initialForm.description,
                        productItems: initialForm.productItems
                    }}
                    validationSchema={yup.object().shape({
                        // images: fileValidation(SIZE_MAX_FILE, ALLOW_ARRAY_IMAGES, false),
                        // name: stringValidation(4, 100, regex.wordVi, false),
                        // brand: stringValidation(4, 100, regex.wordVi, false),
                        // productCategory: selectValidation(productCategories, 'id', false),
                        // description:stringValidation(4, 150, regex.wordVi, true),
                        // variation: selectValidation(variations, 'id', false),
                        // productItems: yup.array().of(
                        //     yup.object().shape({
                        //         images: fileValidation(SIZE_MAX_FILE, ALLOW_ARRAY_IMAGES, false),
                        //         price: numberValidation(1000, 1000000000, false),
                        //         sku: stringValidation(6, 15, regex.number, false),
                        //         qtyInStock: numberValidation(0, 10000000, false),
                        //         promotions: selectMultiValidation<Promotion, number>(promotions, 'id', true),
                        //         variationOptions: selectMultiValidation<VariationOption,number>(variationOptions, 'id', false),
                        //     })
                        // )
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleSendServer(data, setErrors)

                    }
                >
                    {({ values }) => (
                        <Form>
                            <div className="card card-form-product ">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Thông tin sản phẩm

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 ">
                                            <UploadImage name="images" multi={true} />
                                            <ErrorMessage className="form-text form-error" name='images' component='div' />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="name">Tên</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="name" autoComplete="off" className="form-control" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='name' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="brand">Thương hiệu</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="brand" className="form-control" autoComplete="off" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='brand' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="productCategory">Loại Sản Phẩm</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<ProductCategory, number>
                                                    name="productCategory"
                                                    className=""
                                                    options={productCategories || []}
                                                    attribute='id'
                                                    attributeShow={'name'}
                                                    multi={false}
                                                    nameDefault="- Chọn loại sản phẩm -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='productCategory' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="idVariation">Giá trị tùy chọn</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<Variation, number>
                                                    name="variation"
                                                    className=""
                                                    options={variations || []}
                                                    attribute='id'
                                                    attributeShow={'name'}
                                                    multi={false}
                                                    nameDefault="- Chọn giá trị -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='variation' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="card-body-label">
                                                <label htmlFor="description">Mô tả sản phẩm</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CKEditorField name="description" className="" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <FieldArray name="productItems">
                                {({ remove, push }) => (
                                    <>
                                        {values.productItems && values.productItems.map((_, index) => (
                                            <div key={index} className="card card-form-item">
                                                <div className="card-header card-header-item">
                                                    <div className="card-header-title">
                                                        Thông tin mặt hàng
                                                    </div>
                                                    {index !== 0 && (
                                                        <button
                                                            type="button"
                                                            className="delete-array-item"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </button>
                                                    )}

                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <UploadImage name={`productItems[${index}].images`} multi={true} />
                                                            <ErrorMessage className="form-text form-error" name={`productItems[${index}].images`} component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 col-md-4">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItems[${index}].sku`}>Mã code </label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <CustomInput name={`productItems[${index}].sku`} autoComplete="off" className="form-control" type="text" />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItems[${index}].sku`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-4 col-md-4">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItems[${index}].price`}>Giá</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <InputCustomAdornment
                                                                    name={`productItems[${index}].price`}
                                                                    adornment={VND}
                                                                    className=""
                                                                    onKeyDown={handleKeyDownNumber}
                                                                />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItems[${index}].price`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-4 col-md-4">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItems[${index}].qtyInStock`}>Số Lượng Sản Phẩm</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <CustomInput name={`productItems[${index}].qtyInStock`} onKeyDown={handleKeyDownNumber} className="form-control" type="number" />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItems[${index}].qtyInStock`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-6 col-md-6">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItems[${index}].promotions`}>Mã giảm giá</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <SelectForm<Promotion, number>
                                                                    name={`productItems[${index}].promotions`}
                                                                    options={promotions || []}
                                                                    attribute='id'
                                                                    attributeShow={'name'}
                                                                    multi={true}
                                                                    nameDefault="- Chọn mã giảm giá -"
                                                                />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItems[${index}].promotions`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-6 col-md-6">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItems[${index}].variationOptions`}>Mã giảm giá</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <SelectForm<VariationOption, number>
                                                                    name={`productItems[${index}].variationOptions`}
                                                                    className=""
                                                                    options={variationOptions || []}
                                                                    attribute='id'
                                                                    attributeShow={'name'}
                                                                    multi={true}
                                                                    nameDefault="- Chọn giá trị -"
                                                                />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItems[${index}].variationOptions`} component="div" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({
                                                images: [],
                                                price: 0,
                                                qtyInStock: 0,
                                                promotions: [],
                                                variationOptions: []
                                            })}
                                            className="push-array-item"
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </>
                                )}
                            </FieldArray>
                            <button type="submit" style={{ display: 'none' }} ref={buttonRef} id={idButtonSave}></button>
                        </Form>
                    )}
                </Formik>
            </div >
        </div>
    )
}
export default memo(ContentForm)