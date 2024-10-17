'use client'

import SaveAction from "@/components/admin/common/SaveAction"
import ContentForm from "@/components/admin/system/employee/ContentForm"

import { getObjectAsFile } from "@/config/S3Config"
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage"
import { useEditAdmin } from "@/hooks/common/useEditAdmin"
import { useGetDataByIdParam } from "@/hooks/common/useGetDataByIdParam"
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData"
import { useFetchPut } from "@/hooks/fetch-authencation/useFetchPut"
import { District, Province, Ward } from "@/types/adress"
import { FormErrors } from "@/types/erros"
import { Employee, EmployeeAddOrEdit, EmployeeDto } from "@/types/user"
import { FILE_STORE_AWS_PATH } from "@/utils/commonConstants"
import { convertToJsonFile, createActionURL, validation } from "@/utils/commonUtils"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function EditEmployee() {
    const { fetchPut, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPut<FormData>();
    const { fetchData: fetchProvinces, data: provinces} = useFetchData<Province[]>();
    const { fetchData: fetchDistricts, data: districts} = useFetchData<District[]>();
    const { fetchData: fetchWards, data: wards } = useFetchData<Ward[]>();
    const [isLoadingAddress, setIsLoadingAdress] = useState<boolean>(false);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<EmployeeAddOrEdit | null>(null)
    useAuthorizePage("employee:edit")
    useEditAdmin({ code: codeSave, message: messageSave })
    const params = useParams<{ id: string; }>()
    const { isPendingById, initialById, codeById } = useGetDataByIdParam<Employee>('employee',params?.id);
    const initialFilesNotMulti = useCallback(async (keyValue: string) => {
        if (initialById) {
            setIsLoadingAvatar(true)
            try {
                const response = await getObjectAsFile(keyValue);
                setInitialData({...initialById , avatar: [response], confirmPassword:null,password:null});
            } catch (err) {
                console.error(' editEmployee:initialFilesNotMulti :Error fetching file:', err);
                setInitialData({...initialById , avatar: [],confirmPassword:null,password:null})
            } finally {
                setIsLoadingAvatar(false)
            }
        }
    }, [initialById]);

    useEffect(() => {
        if (initialById) {
            if (initialById?.avatar && typeof initialById?.avatar === 'string' && initialById?.avatar.includes(FILE_STORE_AWS_PATH.IMAGE)) {
                initialFilesNotMulti(initialById?.avatar);
            } else {
                setInitialData({ ...initialById ,avatar: [], confirmPassword:null,password:null})
            }
        }
    }, [initialById,initialFilesNotMulti]);
    useEffect(() => {
        const provinceCode = initialById?.provinces;
        const districtCode = initialById?.districts;
        if (codeById !== 200 || !provinceCode || !districtCode) return;
        const fetchAdressEdit = async () => {
            setIsLoadingAdress(true)
            try {
                await Promise.all([
                    fetchProvinces(createActionURL("address/provinces").instant()),
                    fetchDistricts(createActionURL("address/district").requestParam([{ key: "code", value: provinceCode }])),
                    fetchWards(createActionURL("address/ward").requestParam([{ key: "code", value: districtCode }]))
                ]);
            } catch (error) {
                console.error('EditEmployee:Error fetching address data:', error);
            } finally {
                setIsLoadingAdress(false)
            }
        };
        fetchAdressEdit();
    }, [fetchDistricts, fetchWards,fetchProvinces, initialById, codeById]);
    const hanldeResetFieldProvinces = useCallback((province: string, setFieldValue: (field: string, value: string | null, shouldValidate?: boolean) => void) => {
        if (province && validation.isNotEmpty(province)) {
            fetchDistricts(createActionURL("address/district").requestParam([{ key: "code", value: province }]))
        }
        setFieldValue('wards', null)
        setFieldValue("districts", null)
    }, [fetchDistricts]);
    const hanldeResetFieldDistrict = useCallback((districts: string, setFieldValue: (field: string, value: string | null, shouldValidate?: boolean) => void) => {
        if (districts && validation.isNotEmpty(districts)) {
            fetchWards(createActionURL("address/ward").requestParam([{ key: "code", value: districts }]))
        }
        setFieldValue('wards', null)

    }, [fetchWards]);
    const handleSave = useCallback(async (data: EmployeeDto, setErrors: (errors: FormErrors) => void) => {
        console.log(data)
        if (isPendingSave && !params?.id) return;
        const { avatar, ...dataToServer } = data;
        const multiPart = new FormData();
        if (avatar && Array.isArray(avatar) && avatar[0] instanceof File) {
            multiPart.append("avatar", avatar[0]);
        }
        multiPart.append('employeeEditDto', convertToJsonFile(dataToServer));
        console.log(dataToServer)
        fetchPut(createActionURL("employee").pathVariable(params?.id as string), multiPart, setErrors);
    }, [fetchPut, isPendingSave,params?.id])
    const loadingInitialData = useMemo(() => {
        return isLoadingAddress || isPendingById || isLoadingAvatar || initialData === null
    }, [isLoadingAddress, initialData, isPendingById, isLoadingAvatar])

    return (
        <>
            <SaveAction url={"employee"} />
            {initialData &&
                <ContentForm handleSendServer={handleSave} provinces={provinces} wards={wards} districts={districts} hanldeResetFieldDistrict={hanldeResetFieldDistrict} hanldeResetFieldProvinces={hanldeResetFieldProvinces} loadingInitialData={loadingInitialData} initialForm={initialData} />
            }
        </>
    )
}