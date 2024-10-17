import { useButtonSave } from "@/hooks/common/useButtonSave";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { LOADING_CONTENT_FORM, regex } from "@/utils/commonConstants";
import { createActionURL } from "@/utils/commonUtils";
import { memo, useEffect } from "react";

import { ErrorMessage, Form, Formik } from "formik";
import {  selectValidation, stringValidation } from "@/lib/validationForm";
import * as yup from "yup";
import CustomInput from "@/components/composite/form/CustomInput";
import TextArea from "@/components/composite/form/TextArea";
import SelectForm from "@/components/composite/form/SelectForm";
import { Variation,  VariationOptionDto } from "@/types/product";
import { FormErrors } from "@/types/erros";
interface propsContentFormVariationOption {
    initialForm: VariationOptionDto,
    handleSendServer: (
        data: VariationOptionDto,
        setErrors: (errors: FormErrors) => void
    ) => Promise<void>;
}
function ContentForm({ initialForm, handleSendServer }: propsContentFormVariationOption) {
    const { idButtonSave, buttonRef } = useButtonSave()
    const { fetchData: fetchDataVariations, data: variations, isPending: isPendingVariations } = useFetchData<Variation[]>();
    useEffect(() => {
        fetchDataVariations(createActionURL('variation').instant())
    }, [fetchDataVariations])

    return (
        <div className={isPendingVariations ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-variation main-content-form " >
                <div className="card card-form-variation">
                    <div className="card-header">
                        <div className="card-header-title">
                            Thông tin giá trị tùy chọn
                        </div>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: initialForm.name,
                            description: initialForm.description,
                            idVariation: variations ? initialForm.idVariation ?? null : null
                        }}
                        validationSchema={yup.object().shape({
                            name: stringValidation(1, 70, regex.wordVi, false),
                            description: stringValidation(4, 150, regex.wordVi, false),
                            idVariation: selectValidation<Variation>(variations, 'id', false),
                        })}
                        onSubmit={(data, { setErrors }) =>
                            handleSendServer(data, setErrors)
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
                                            <CustomInput name="name" autoComplete="off" className="form-control" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='name' component='div' />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="description">Mô tả</label>
                                        </div>
                                        <div className="card-body-input">
                                            <TextArea name="description" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="idVariation">Option</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectForm<Variation, number>
                                                name="idVariation"
                                                className=""
                                                options={variations || []}
                                                attribute='id'
                                                attributeShow='name'
                                                multi={false}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='idVariation' component='div' />
                                    </div>
                                </div>
                                <button type="submit" style={{ display: 'none' }} ref={buttonRef} id={idButtonSave}></button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default memo(ContentForm)