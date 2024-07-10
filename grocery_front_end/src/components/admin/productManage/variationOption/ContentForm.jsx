import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/product/variationOption/contentForm.css"
import { memo, useEffect, useState } from "react";
import BaseServiceAdmin from "../../../../services/admin/base";
import { SelectFieldFormik } from "../../../composite/formik/SelectedFieldFormik";
import { variationHttp } from "../../../../constants/admin/productManage/variation";
function ContentForm(props) {
    const { handleSave, initialForm, buttonRef } = props;
    const [variations, setVariations] = useState([]);
    useEffect(() => {
        getOptions();
    }, [])
    const getOptions = async () => {
        try {
            const response = await BaseServiceAdmin.getAll(variationHttp.variation)
            setVariations(response.result)
        } catch (error) {
            console.log(error)
            setVariations([]);
        }
    }
    const handleDataSave = (data, setErrors) => {
        const variationTemp = variations.find(each => each.id === (data.variation * 1))
        if (variationTemp === undefined) {
            setErrors({ variation: "Lỗi dữ liệu không tồn tại" })
            return;
        } else {
            const newVariationOption = { ...data, variation: variationTemp };
            handleSave(newVariationOption, setErrors)
        }
    }
    return (
        <div className="main-content-form-variation main-content-form" >
            <div className="card card-form-variation">
                <div className="card-header">
                    Thông tin giá trị tùy chọn
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialForm.name,
                        description: initialForm.description,
                        variation: initialForm.variation.id,
                    }}
                    validationSchema={yup.object({
                        name: yup.string().required("Chưa nhập tên :"),
                        variation: yup.string().required("Chưa nhập Option :")
                            .matches(/^\d+\.?\d*$/, "Hệ thống dữ liệu nhập sai :")
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleDataSave(data, setErrors)
                    }
                >
                    <Form>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="name">Tên</label>
                                    <Field name="name" className="form-control" type="text" />
                                    <ErrorMessage className="form-text form-error" name='name' component='div' />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="description">Mô tả</label>
                                    <Field name="description" className="form-control" as="textarea" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="variation">Option</label>
                                    <SelectFieldFormik
                                        name="variation"
                                        className="form-control"
                                        options={variations}
                                    />
                                    <ErrorMessage className="form-text form-error" name='variation' component='div' />
                                </div>
                            </div>
                            <button type="submit" style={{ display: 'none' }} ref={buttonRef}></button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default memo(ContentForm);