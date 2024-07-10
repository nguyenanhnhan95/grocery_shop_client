import { Form,Formik } from "formik";
import "../../../../assets/css/admin/product/productManages/contentForm.css"
import UploadImg from "../../../composite/formik/UploadImg";
import * as yup from "yup";
function ContentForm(props) {
    const { handleSave, initialForm, buttonRef } = props;
    const handleDataSave=()=>{

    }
    return (
        <div className="main-content-form-product main-content-form">
            <div className="card card-form-product">
                <div className="card-header">
                    Thông tin sản phẩm
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                    }}
                    validationSchema={yup.object({
                       
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleDataSave(data, setErrors)
                    }
                >
                    <div className="card-body">
                        <div className="row">
                            <UploadImg />
                        </div>
                        <div className=""></div>
                    </div>
                    {/* <Form>
                    </Form> */}
                </Formik>
            </div>
        </div>
    )
}
export default ContentForm;