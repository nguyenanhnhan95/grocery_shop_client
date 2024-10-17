import { memo } from "react";
import { useButtonSave } from "@/hooks/common/useButtonSave";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { PERCENT_STRING, regex } from "@/utils/commonConstants";
import { dateValidation, stringValidation } from "@/lib/validationForm";
import { numberValidation } from "../../../../lib/validationForm";
import CustomInput from "@/components/composite/form/CustomInput";
import { handleKeyDownNumber } from "@/lib/eventInput";
import InputCustomAdornment from "@/components/composite/form/InputAdornment";
import TextArea from "@/components/composite/form/TextArea";
import InputDate from "@/components/composite/form/InputDate";
import {  PromotionDto } from "@/types/promotion";
import { FormErrors } from "@/types/erros";

interface propsContentFormPromotion {
    initialForm: PromotionDto,
    handleSendServer: (
        data: PromotionDto,
        setErrors: (errors: FormErrors) => void
    ) => Promise<void>;
}
function ContentForm({ initialForm, handleSendServer }: propsContentFormPromotion) {
    const { idButtonSave, buttonRef } = useButtonSave()
    return (
        <div className="main-content-form-promotion main-content-form" >
            <div className="card card-form-promotion">
                <div className="card-header">
                    <div className="card-header-title">
                        Thông tin mã giảm giá
                    </div>
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialForm.name,
                        code: initialForm.code,
                        description: initialForm.description,
                        discountRate: initialForm.discountRate,
                        startDate: initialForm?.startDate,
                        endDate: initialForm?.endDate ? new Date(initialForm.endDate) : null,
                    }}
                    validationSchema={yup.object({
                        name: stringValidation(6, 70, regex.wordVi, false),
                        code: stringValidation(2, 70, regex.number, false),
                        description: stringValidation(2, 70, regex.wordVi, false),
                        discountRate: numberValidation(1, 100, true),
                        startDate: dateValidation((() => {
                            const date = new Date();
                            date.setHours(0, 0, 0, 0);
                            return date;
                        })(), null),
                        endDate: yup.date()
                            .nullable()
                            .notRequired()
                            .min(yup.ref('startDate'), "Ngày kết thúc phải lớn hơn ngày bắt đầu ."),
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleSendServer(data, setErrors)
                    }
                >
                    <Form>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="card-body-label">
                                        <label htmlFor="name">Tên</label>
                                    </div>
                                    <div className="card-body-input">
                                        <CustomInput name="name" autoComplete="off" className="form-control" placeholder="Nguyen Van A" type="text" />
                                    </div>
                                    <ErrorMessage className="form-text form-error" name='name' component='div' />
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="card-body-label">
                                        <label htmlFor="code">Mã code</label>
                                    </div>
                                    <div className="card-body-input">
                                        <CustomInput name="code" className="form-control" onKeyDown={handleKeyDownNumber} autoComplete="off" type="number" />
                                    </div>
                                    <ErrorMessage className="form-text form-error" name='code' component='div' />
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="card-body-label">
                                        <label htmlFor="discountRate">Phần trăm giảm giá</label>
                                    </div>
                                    <div className="card-body-input">
                                        <InputCustomAdornment name="discountRate" type="number" onKeyDown={handleKeyDownNumber} className="" autoComplete="off" adornment={PERCENT_STRING} />
                                    </div>
                                    <ErrorMessage className="form-text form-error" name='discountRate' component='div' />
                                </div>
                                <div className="col-12 col-md-4  mt-2">
                                    <div className="card-body-label">
                                        <label htmlFor="description">Mô tả</label>
                                    </div>
                                    <div className="card-body-input">
                                        <TextArea name="description" className="form-control" />
                                    </div>
                                    <ErrorMessage className="form-text form-error" name='description' component='div' />
                                </div>
                                <div className="col-12 col-md-4  mt-2">
                                    <div className="card-body-label">
                                        <label htmlFor="startDate">Ngày bắt đầu</label>
                                    </div>
                                    <div className="card-body-input">
                                        <InputDate name="startDate" title="Ngày bắt đầu" className="form-control" type="date" />
                                    </div>
                                    <ErrorMessage className="form-text form-error" name='startDate' component='div' />
                                </div>
                                <div className="col-12 col-md-4  mt-2">
                                    <div className="card-body-label">
                                        <label htmlFor="endDate">Ngày kết thúc</label>
                                    </div>
                                    <div className="card-body-input">
                                        <InputDate name="endDate" className="form-control" type="date" />
                                        <ErrorMessage className="form-text form-error" name='endDate' component='div' />
                                    </div>
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