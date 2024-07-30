import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import "../../../../assets/css/admin/productManage/product/contentForm.css"
import * as yup from "yup";
import UploadImage from "./../../../composite/formik/UploadImg"
import "../../../../assets/css/admin/skeletonLoading/contentForm.css"
import axios from "axios";
import { checkFileSize, createHeader } from "../../../../utils/commonUtils";
import { SelectFieldFormik } from "../../../composite/formik/SelectedFieldFormik";
import { useSelector } from "react-redux";
import { CKEditorField } from "../../../composite/formik/CKEditorField";
import { THIS_FILE_SIZE_TOO_LARGE, THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY } from "../../../../utils/commonConstants";
import { getObject } from "../../../../config/S3Config";
import { useCallback, useEffect } from "react";

function ContentForm(props) {
    const { handleSave, initialForm, buttonRef } = props;
    const { children } = useSelector(state => state.productCategoryMenus);
    const { variations } = useSelector(state => state.productVariation);
    const { promotions } = useSelector(state => state.shopPromotion)
    const dirPath = "productManage/product/"
    const handleSaveData = async (formData, error) => {
        for (const [key, value] of formData.entries()) {
            console.log(value)
        }

        try {
            console.log(formData)
            const response = await axios.post(`http://localhost:8080/products`, formData, createHeader());
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const initialValues = {
        images: [],
        title: '',
        brand: '',
        productCategory: '',
        variation: '',
        description: '',
        ProductItem: [{
            images: [],
            price: 0,
            qtyInStock: 0,
            promotions: [],
            variationOptions: []
        }]
    };
   
    
    console.log(ContentForm.name.toLowerCase() + '/')
    return (
        <div className="main-content-form-product main-content-form">

            <Formik
                enableReinitialize={true}
                initialValues={initialValues
                }
                validationSchema={yup.object().shape({

                })}
                onSubmit={(data, { setErrors }) =>
                    console.log(data)
                    // handleSaveData(data.images, setErrors)
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
                                        <div className="card-body-input"><Field name="name" autoComplete="off" className="form-control" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='name' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="brand">Thương hiệu</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="brand" className="form-control" autoComplete="off" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='brand' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="productCategory">Loại Sản Phẩm</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectFieldFormik
                                                name="productCategory"
                                                className="form-control"
                                                options={children}
                                                multi={false}
                                                nameDefault="- Chọn loại sản phẩm -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='productCategory' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="variation">Giá trị tùy chọn</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectFieldFormik
                                                name="variation"
                                                className="form-control"
                                                options={variations}
                                                multi={false}
                                                component={SelectFieldFormik}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='variation' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="card-body-label">
                                            <label htmlFor="variation">Mô tả sản phẩm</label>
                                        </div>
                                        <div className="card-body-input">
                                            <CKEditorField name="description" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <FieldArray name="ProductItem">
                            {({ remove, push }) => (
                                <>
                                    {values.ProductItem.map((item, index) => (
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
                                                        <UploadImage name={`ProductItem.${index}.images`} multi={false} />
                                                        <ErrorMessage className="form-text form-error" name={`ProductItem.${index}.images`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-4">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`ProductItem.${index}.price`}>Giá</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <Field name={`ProductItem.${index}.price`} className="form-control" autoComplete="off" type="number" />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`ProductItem.${index}.price`} component="div" />
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-4">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`ProductItem.${index}.qtyInStock`}>Số Lượng Sản Phẩm</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <Field name={`ProductItem.${index}.qtyInStock`} className="form-control" type="number" />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`ProductItem.${index}.qtyInStock`} component="div" />
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-4">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`ProductItem.${index}.promotions`}>Mã giảm giá</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <SelectFieldFormik
                                                                name={`ProductItem.${index}.promotions`}
                                                                className="form-control"
                                                                options={promotions}
                                                                multi={true}
                                                                nameDefault="- Chọn mã giảm giá -"
                                                            />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`ProductItem.${index}.promotions`} component="div" />
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
                        <button type="submit" style={{ display: 'none' }} ref={buttonRef}></button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}
export default ContentForm;