'use client'
import { memo, useCallback, useEffect, useState } from "react";
import { ErrorMessage,  Form, Formik } from "formik";
import * as yup from "yup";
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost";
import { DOMAIN, EMPTY_STRING, PLACE_HOLDER_PASSWORD } from "@/utils/commonConstants";
import { useCookies } from "@/hooks/common/useCookie";
import { useRouter } from "next/navigation";
import CustomInput from "../composite/form/CustomInput";
import { createActionURL } from "@/utils/commonUtils";



interface LoginRequest {
    nameLogin: string | null,
    password: string | null,
    flagKeep?: boolean
}
const initialValue: LoginRequest = {
    nameLogin: null,
    password: null,
}
const KEEP_LOGIN = "keepLogin";
function LoginForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [keepLogin, setKeepLogin] = useState<boolean>(false)
    const router = useRouter();

    const { fetchPost, isPending, code } = useFetchPost();

    const handleLogin = useCallback(async (loginRequest: LoginRequest, setErrors: (errors: any) => void) => {
        console.log(loginRequest)
        fetchPost(createActionURL("auth/login").instant(), { ...loginRequest, flagKeep: keepLogin }, setErrors)

    }, [fetchPost, isPending])
    useEffect(() => {
        if (code === 200) {
            router.push("/")
        }
    }, [code, router])
    const handleKeepLogin = (currentKeepLogin: boolean) => {
        const [data, setCookie, removeCookie] = useCookies(KEEP_LOGIN)
        if (currentKeepLogin) {
            setKeepLogin(false);
            removeCookie()
        } else {
            setCookie(KEEP_LOGIN, { domain: DOMAIN, path: EMPTY_STRING })
            setKeepLogin(true);
        }
    }
    useEffect(() => {
        const elements = document.querySelectorAll('[cz-shortcut-listen]');
        elements.forEach(el => el.removeAttribute('cz-shortcut-listen'));
    }, []); 
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValue}
                validationSchema={yup.object({
                    nameLogin: yup.string().trim().required("Chưa nhập email :"),
                    password: yup.string().required("Chưa nhập mật khẩu")
                })}
                onSubmit={(value, { setErrors }) =>
                    handleLogin(value, setErrors)
                }
            >
                <Form>
                    <div className="form-login">
                        <ErrorMessage className="form-text form-error" name='notificationFail' component='div' />
                        <div className="mb-3 form-login-input">
                            <label htmlFor="nameLogin" className="form-label">Tên đăng nhập</label>
                            <CustomInput type="text" name="nameLogin" className="form-control" id="nameLogin" autoComplete="off" placeholder="join" />
                            <ErrorMessage className="form-text form-error" name='nameLogin' component='div' />
                        </div>
                        <div className="mb-3 form-password form-login-input">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <CustomInput type={showPassword ? 'text' : 'password'} name="password" className="form-control " autoComplete="username password" id="password" placeholder={PLACE_HOLDER_PASSWORD} />
                            <ErrorMessage name='password' className="form-text form-error" component='div' />
                            {showPassword ?
                                <i className="fa-solid fa-eye" onClick={() => setShowPassword(false)} />
                                :
                                <i className="fa-solid fa-eye-slash" onClick={() => setShowPassword(true)}></i>
                            }
                        </div>
                        <div className="mb-3 form-check d-flex align-items-center">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked={keepLogin}
                                onChange={() => handleKeepLogin(keepLogin)} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Duy trì đăng nhập</label>
                        </div>
                        <button disabled={isPending} type="submit" className="form-submit mb-3" role="status">
                            Đang nhập
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
export default memo(LoginForm);