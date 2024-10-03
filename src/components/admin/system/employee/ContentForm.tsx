import { ErrorMessage, Form, Formik } from "formik"
import { InitialForm } from "./initialConfig"
import * as yup from "yup";
import { ALLOW_ARRAY_IMAGES, LOADING_CONTENT_FORM, PLACE_HOLDER_CURRENT_RESIDENCE, PLACE_HOLDER_EMAIL, regex, SIZE_MAX_FILE, THIS_FIELD_BIRTH_OF_DATE_GREATER_THAN_18, THIS_FIELD_CANNOT_EMPTY, THIS_FIELD_CONFIRM_NOT_MATCH, THIS_FIELD_VALUE_NOT_FORMAT, THIS_FILE_NOT_FORMAT, THIS_FILE_SIZE_TOO_LARGE, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, THIS_FILED_SELECT_ITEM_CANNOT_EMPTY } from "@/utils/commonConstants";
import { createActionURL } from "@/utils/commonUtils";
import { selectMultiValidation, selectValidation, confirmPasswordValidation, dateValidation, fileValidation, stringValidation } from "@/lib/validationForm";
import UploadImage from "@/components/composite/form/UploadImage";
import CustomInput from "@/components/composite/form/CustomInput";
import SelectForm from "@/components/composite/form/SelectForm";
import InputDate from "@/components/composite/form/InputDate";
import { InputPassword } from "@/components/composite/form/InputPassword";
import { memo, useEffect } from "react";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { handleKeyDownNumber } from "@/lib/eventInput";
import { useButtonSave } from "@/hooks/common/useButtonSave";
interface propsContentFormEmployee {
    initialForm: InitialForm,
    loadingInitialData: boolean,
    provinces: Province[] | null,
    districts: District[] | null,
    wards: Ward[] | null,
    hanldeResetFieldDistrict: (districts: string, setFieldValue: (field: string, value: string | null, shouldValidate?: boolean) => void) => void,
    hanldeResetFieldProvinces: (districts: string, setFieldValue: (field: string, value: string | null, shouldValidate?: boolean) => void) => void,
    handleSendServer: (
        data: InitialForm,
        setErrors: (errors: any) => void
    ) => Promise<void>;
}
function ContentForm({ initialForm, provinces, districts, wards, hanldeResetFieldDistrict, hanldeResetFieldProvinces, loadingInitialData, handleSendServer }: propsContentFormEmployee) {
    const { idButtonSave, buttonRef } = useButtonSave()

    const { fetchData: fetchStatusAccounts, data: statusAccounts, isPending: isPendingStatusAccounts } = useFetchData<StatusAccount[]>();
    const { fetchData: fetchRoles, data: roles, isPending: isPendingRoles } = useFetchData<Role[]>();


    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchStatusAccounts(createActionURL("profile/account-status").instant()),
                fetchRoles(createActionURL("role/employee").instant())
            ]);
        };
        fetchAllData();
    }, [fetchStatusAccounts])
    return (
        <>

            <div className={isPendingStatusAccounts || isPendingRoles || loadingInitialData ? LOADING_CONTENT_FORM : ''}>
                <div className="main-content-form-staff main-content-form">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            avatar: initialForm.avatar,
                            name: initialForm.name,
                            phone: initialForm.phone,
                            nameLogin: initialForm.nameLogin,
                            email: initialForm.email,
                            password: initialForm.password,
                            confirmPassword: initialForm.confirmPassword,
                            idCard: initialForm.idCard,
                            birthOfDate: initialForm.birthOfDate,
                            address: initialForm.address,
                            provinces: provinces ? initialForm?.provinces : '',
                            districts: districts ? initialForm.districts : '',
                            wards: wards ? initialForm.wards : '',
                            accountStatus: statusAccounts ? initialForm.accountStatus : '',
                            roles: roles ? initialForm.roles : [],
                        }}
                        validationSchema={yup.object().shape({
                            avatar: fileValidation(SIZE_MAX_FILE, ALLOW_ARRAY_IMAGES, true),
                            name: stringValidation(6, 70, regex.fullName, false),
                            nameLogin: stringValidation(6, 70, regex.wordVi, false),
                            roles: selectMultiValidation<Role, number>(roles, 'id', false),
                            accountStatus: selectValidation(statusAccounts, 'id', false),
                            password: stringValidation(6, 50, regex.password, initialForm?.id === null ? false : true),
                            confirmPassword: confirmPasswordValidation(6, 50, regex.password, initialForm?.id === null ? false : true),
                            email: stringValidation(6, 70, regex.email, false),
                            phone: stringValidation(10, 12, regex.phone, false),
                            birthOfDate: dateValidation(new Date(1900, 0, 1), 18),
                            idCard: stringValidation(9, 12, regex.cccd),
                            address: stringValidation(9, 12, regex.address),
                            provinces: yup.string().trim()
                                .nullable(),
                            districts: selectValidation(districts, 'code'),
                            wards: selectValidation(wards, 'code'),

                        })}
                        onSubmit={(data, { setErrors }) =>
                            handleSendServer(data, setErrors)
                        }
                    >
                        <Form>
                            <div className="card card-form-product ">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Thông tin người dùng
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 ">
                                            <UploadImage name="avatar" multi={false} />
                                            <ErrorMessage className="form-text form-error" name='avatar' component='div' />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="name">Họ và tên<span className="required">*</span> </label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="name" autoComplete="off" className="form-control" placeholder="Nguyen Van A" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='name' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="nameLogin">Tên đăng nhập<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="nameLogin" autoComplete="off" placeholder="nguyenvana" className="form-control" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='nameLogin' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="phone">Số điện thoại</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="phone" className="form-control" onKeyDown={handleKeyDownNumber} autoComplete="off" type="number" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='phone' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="email" autoComplete="off" placeholder={PLACE_HOLDER_EMAIL} className="form-control" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='email' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4">
                                            <div className="card-body-label">
                                                <label htmlFor="provinces">Trạng thái tài khoản<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<StatusAccount, string>
                                                    name="accountStatus"
                                                    className=""
                                                    options={statusAccounts || []}
                                                    attribute='id'
                                                    attributeShow={'name'}
                                                    multi={false}
                                                    nameDefault="- Chọn trạng thái tài khoản -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='accountStatus' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4">
                                            <div className="card-body-label">
                                                <label htmlFor="roles">Vai trò<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<Role, number>
                                                    name="roles"
                                                    className=""
                                                    options={roles || []}
                                                    attributeShow='name'
                                                    attribute='id'
                                                    // errors={errors}
                                                    multi={true}
                                                    nameDefault="- Chọn vai trò -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='roles' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="idCard">Căn cước công dân</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomInput name="idCard" className="form-control" onKeyDown={handleKeyDownNumber} autoComplete="off" type="number" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='idCard' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="birthOfDate">Ngày Sinh</label>
                                            </div>
                                            <div className="card-body-input">
                                                <InputDate name="birthOfDate" title="Ngày sinh" className="form-control" type="date" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='birthOfDate' component='div' />
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4 ">
                                                <div className="card-body-label">
                                                    <label htmlFor="password">Mật khẩu<span className="required">*</span></label>
                                                </div>
                                                <div className="card-body-input ">
                                                    <InputPassword
                                                        name="password"
                                                        className=""
                                                    />
                                                </div>
                                                <ErrorMessage className="form-text form-error" name='password' component='div' />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4">
                                                <div className="card-body-label">
                                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu<span className="required">*</span></label>
                                                </div>
                                                <div className="card-body-input ">
                                                    <InputPassword
                                                        name="confirmPassword"
                                                        className=""
                                                    />
                                                </div>
                                                <ErrorMessage className="form-text form-error" name='confirmPassword' component='div' />
                                            </div>
                                        </div>


                                        <hr />
                                        <div className="col-12  ">
                                            <div className="card-body-label">
                                                <label htmlFor="address">Nơi ở hiện tại</label>
                                            </div>
                                            <div className="card-body-input"><CustomInput name="address" autoComplete="off" placeholder={PLACE_HOLDER_CURRENT_RESIDENCE} className="form-control" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='address' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4">
                                            <div className="card-body-label">
                                                <label htmlFor="provinces">Tỉnh/Thành phố</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<Province, string>
                                                    name="provinces"
                                                    className=""
                                                    options={provinces || []}
                                                    attribute='code'
                                                    attributeShow='name'
                                                    // errors={errors}
                                                    processField={hanldeResetFieldProvinces}
                                                    multi={false}
                                                    nameDefault="- Chọn thành phố -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='provinces' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4">
                                            <div className="card-body-label">
                                                <label htmlFor="districts">Quận/Huyện</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<District, string>
                                                    name="districts"
                                                    className=""
                                                    attribute='code'
                                                    attributeShow='name'
                                                    processField={hanldeResetFieldDistrict}
                                                    options={districts || []}
                                                    multi={false}
                                                    nameDefault="- Chọn quận/huyện -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='districts' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4">
                                            <div className="card-body-label">
                                                <label htmlFor="wards">Phường/Xã</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<Ward, string>
                                                    name="wards"
                                                    className=""
                                                    attribute='code'
                                                    attributeShow='name'
                                                    options={wards || []}
                                                    multi={false}
                                                    nameDefault="- Chọn phường/xã -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='wards' component='div' />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <button type="submit" style={{ display: 'none' }} ref={buttonRef} id={idButtonSave} ></button>
                        </Form>
                    </Formik>
                </div >
            </div >

        </>
    )
}
export default memo(ContentForm)