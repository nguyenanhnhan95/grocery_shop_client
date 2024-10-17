import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { createActionURL, validation } from "@/utils/commonUtils";
import React, { memo, useCallback, useEffect,  useState } from "react";
import { LOADING_CONTENT_FORM, regex, ROLES, THIS_FILE_ENTER_FAIL } from "@/utils/commonConstants";
import { ErrorMessage, Form, Formik } from "formik";
import {  selectValidation, stringValidation } from "@/lib/validationForm";
import * as yup from "yup";
import SelectForm from "@/components/composite/form/SelectForm";
import TextArea from "@/components/composite/form/TextArea";
import GroupCheckBoxPermission from "./GroupCheckBoxPermission";
import { useButtonSave } from "@/hooks/common/useButtonSave";
import { Permission, RoleAlias, RoleDto } from "@/types/role";
import { FormErrors } from "@/types/erros";
interface propsContentFormRole {
    initialForm: RoleDto,
    handleSendServer: (
        data: RoleDto,
        setErrors: (errors: FormErrors) => void
    ) => Promise<void>;
}
function ContentForm({ initialForm, handleSendServer }: propsContentFormRole) {
    const {idButtonSave,buttonRef}=useButtonSave()
    const [aliasRole, setAliasRole] = useState<string|null>(initialForm.alias);
    
    const { fetchData: fetchPermission, data: listPermissions, isPending: isPendingListPermissions } = useFetchData<Permission[]>();
    const { fetchData: fetchRoleAlias, data: listRoleAlias, isPending: isPendingRoleAlias } = useFetchData<RoleAlias[]>();
    const { fetchData: fetchNameRole, data: listNameRoles } = useFetchData<Record<string, string>[]>();
    useEffect(() => {
        if (aliasRole && ROLES.LIST_ALIAS.includes(aliasRole)) {
            fetchNameRole(createActionURL("role/e-role").requestParam([{ key: "name", value: aliasRole }]));
        }
    }, [aliasRole,  fetchNameRole]);

    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchPermission(createActionURL("role/permissions").instant()),
                fetchRoleAlias(createActionURL("role/alias").instant()),
            ]);
        };
        fetchAllData();
    }, [fetchPermission, fetchRoleAlias])
    const handleSuitablePermission = (permisson:any): boolean  => {
        if (validation.isArrayEmpty(permisson)) {
            return true;
        }
        if (Array.isArray(permisson) && Array.isArray(listPermissions)) {
            return listPermissions.some((each) =>
                each.scopes.some(scope =>
                    permisson.includes(scope.id)
                )
            );
        }
        return true;
    }
    const handleSelectedRole = useCallback((aliasRole:string, setFieldValue: (field: string, value: number | null, shouldValidate?: boolean) => void) => {
        setAliasRole(aliasRole)
        setFieldValue("name", null)
    }, [])
    return (
        <div className={isPendingListPermissions || isPendingRoleAlias ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-role main-content-form " >
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name:listNameRoles ? initialForm.name :null,
                        alias: listRoleAlias ? initialForm.alias :null,
                        description: initialForm.description,
                        permissions: listPermissions ? initialForm.permissions:[],
                    }}
                    validationSchema={yup.object().shape({
                        name: selectValidation(listNameRoles, 'name', false),
                        description: stringValidation(6, 70, regex.wordVi, true),
                        alias: selectValidation(listRoleAlias, 'id', false),
                        permissions: yup.mixed()
                            .test('isSuitable', THIS_FILE_ENTER_FAIL, handleSuitablePermission)
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleSendServer(data, setErrors)

                    }
                >
                    <Form className="row">
                        <div className="col-12 col-md-7">
                            <div className="card card-update-role ">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Cập nhập vai trò
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="card-body-label">
                                                <label htmlFor="alias">Vai trò<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<RoleAlias,number>
                                                    name="alias"
                                                    className=""
                                                    options={listRoleAlias || []}
                                                    attribute='id'
                                                    attributeShow='name'
                                                    processField={handleSelectedRole}
                                                    multi={false}
                                                    nameDefault="- Chọn vai trò -"
                                                />

                                            </div>
                                            <ErrorMessage className="form-text form-error" name='alias' component='div' />
                                        </div>
                                        <div className="col-6">
                                            <div className="card-body-label">
                                                <label htmlFor="name">Tên<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectForm<Record<string, string>,string>
                                                    name="name"
                                                    className=""
                                                    options={listNameRoles|| []}
                                                    attribute='name'
                                                    attributeShow='name'
                                                    multi={false}
                                                    nameDefault="- Chọn tên vai trò -"
                                                />

                                            </div>
                                            <ErrorMessage className="form-text form-error" name='name' component='div' />
                                        </div>
                                        <div className="col-12 ">
                                            <div className="card-body-label">
                                                <label htmlFor="description">Mô tả</label>
                                            </div>
                                            <div className="card-body-input">
                                                <TextArea name="description" className="form-control"  />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='description' component='div' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="card card card-update-permission">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Phân quyền
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ErrorMessage className="form-text form-error" name='permissions' component='div' />
                                    <table className="table table-hover table-permisson">
                                        <thead className="table-thead sticky-header">
                                            <tr >
                                                <th scope="col">Quyền</th>
                                                <th scope="col permission-scope-check">Chọn</th>
                                            </tr>
                                        </thead>

                                        {
                                            listPermissions && listPermissions.map((permissons:Permission, index:number) => (
                                                <React.Fragment key={index} >
                                                    <GroupCheckBoxPermission permission={permissons} />
                                                </React.Fragment>
                                            ))
                                        }

                                    </table>
                                </div>

                            </div>
                        </div>
                        <button type="submit" style={{ display: 'none' }} ref={buttonRef} id={idButtonSave} ></button>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}
export default memo(ContentForm)