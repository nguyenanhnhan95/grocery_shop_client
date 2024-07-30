import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/productManage/variationOption/contentForm.css"
import { memo } from "react";
import BaseServiceAdmin from "../../../../services/admin/base";
import { SelectFieldFormik } from "../../../composite/formik/SelectedFieldFormik";
import { initialForm } from "./initialConfig";
import { useSelector } from "react-redux";

function ContentForm(props) {
    const { handleSave, buttonRef } = props;
    const { variations } = useSelector(state => state.productVariation)
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
                                    <div className="card-body-label">
                                        <label htmlFor="name">Tên</label>
                                    </div>
                                    <div className="card-body-input">
                                        <Field name="name" className="form-control" type="text" />
                                    </div>
                                    <ErrorMessage className="form-text form-error" name='name' component='div' />
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="card-body-label">
                                        <label htmlFor="description">Mô tả</label>
                                    </div>
                                    <div className="card-body-input">
                                        <Field name="description" className="form-control" as="textarea" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="card-body-label">
                                        <label htmlFor="variation">Option</label>
                                    </div>
                                    <div className="card-body-input">
                                    <SelectFieldFormik
                                        name="variation"
                                        className="form-control"
                                        options={variations}
                                        nameDefault="- Chọn giá trị -"
                                    />
                                    </div>
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