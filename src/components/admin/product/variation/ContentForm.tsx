import { ErrorMessage, Form, Formik } from "formik";
import { stringValidation } from "@/lib/validationForm";
import { regex } from "@/utils/commonConstants";
import * as yup from "yup";
import CustomInput from "@/components/composite/form/CustomInput";
import TextArea from "@/components/composite/form/TextArea";
import { useButtonSave } from "@/hooks/common/useButtonSave";
import { memo } from "react";
import {  VariationDto } from "@/types/product";
import { FormErrors } from "@/types/erros";

interface propsContentFormVariation {
    initialForm: VariationDto,
    handleSendServer: (
        data: VariationDto,
        setErrors: (errors: FormErrors) => void
    ) => Promise<void>;
}
function ContentForm({ initialForm, handleSendServer }: propsContentFormVariation) {
    const { idButtonSave, buttonRef } = useButtonSave()
    
    return (
        <div className="main-content-form-variation main-content-form" >
            <div className="card card-form-variation">
                <div className="card-header">
                    <div className="card-header-title">
                        Thông tin tùy chọn sản phẩm
                    </div>
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialForm.name,
                        description: initialForm.description,
                    }}
                    validationSchema={yup.object({
                        name: stringValidation(1, 70, regex.wordVi, false),
                        description: stringValidation(2, 70, regex.wordVi, true),
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleSendServer(data, setErrors)
                    }
                >
                    <Form>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="name">Tên</label>
                                    <CustomInput name="name" autoComplete="off" className="form-control" type="text" />
                                    <ErrorMessage className="form-text form-error" name='name' component='div' />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="description">Mô tả</label>
                                    <TextArea name="description" className="form-control" />
                                </div>
                            </div>
                            <button type="submit" style={{ display: 'none' }} ref={buttonRef} id={idButtonSave} ></button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default memo(ContentForm)