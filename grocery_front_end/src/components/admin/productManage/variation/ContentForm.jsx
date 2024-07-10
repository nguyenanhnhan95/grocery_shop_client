import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/product/variation/contentForm.css"
import { memo } from "react";


function ContentForm(props) {
    const { handleSave, initialForm, buttonRef } = props;
    return (
        <div className="main-content-form-variation main-content-form" >
            <div className="card card-form-variation">
                <div className="card-header">
                    Thông tin tùy chọn sản phẩm
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialForm.name,
                        description: initialForm.description,
                    }}
                    validationSchema={yup.object({
                        name: yup.string().required("Chưa nhập tên :")
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleSave(data, setErrors)
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