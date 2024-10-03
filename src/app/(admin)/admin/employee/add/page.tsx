'use client'

import SaveAction from "@/components/admin/common/SaveAction"
import ContentForm from "@/components/admin/system/employee/ContentForm"
import { InitialForm, initialForm } from "@/components/admin/system/employee/initialConfig"
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage"

import { useSaveAdmin } from "@/hooks/common/useSaveAdmin"
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData"
import { useFetchPost } from "@/hooks/fetch-authencation/useFetchPost"
import { convertToJsonFile, createActionURL, validation } from "@/utils/commonUtils"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function AddEmployee() {
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost<FormData>();
    const { fetchData: fetchProvinces, data: provinces, isPending: isPendingProvinces } = useFetchData<Province[]>();
    const { fetchData: fetchDistricts, data: districts, isPending: isPendingDistricts } = useFetchData<District[]>();
    const { fetchData: fetchWards, data: wards, isPending: isPendingWards } = useFetchData<Ward[]>();
    useAuthorizePage("employee:add")
    useSaveAdmin({ code: codeSave, message: messageSave })
    useEffect(() => {
        fetchProvinces(createActionURL("address/provinces").instant())
    }, [fetchProvinces])
    useEffect(() => {
        if (initialForm.provinces && validation.isNotEmpty(initialForm.provinces)) {
            fetchDistricts(createActionURL("address/district").requestParam([{ key: "code", value: initialForm.provinces }]))
        }
    }, [initialForm.provinces, fetchDistricts])
    const handleSave = useCallback(async (data: InitialForm, setErrors: (errors: any) => void) => {
        if (isPendingSave) return;
        const { avatar, ...dataToServer } = data;
        const multiPart = new FormData();
        if (avatar && Array.isArray(avatar) && avatar[0] instanceof File) {
            multiPart.append("avatar", avatar[0]);
        }
        multiPart.append('employeeDto', convertToJsonFile(dataToServer));
        fetchPost(createActionURL("employee").instant(), multiPart, setErrors);
    }, [fetchPost, isPendingSave])
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
    const loadingInitialData = useMemo(() => {
        return isPendingProvinces
    }, [isPendingProvinces])
    return (
        <>
            <SaveAction url={"employee"} />
            <ContentForm handleSendServer={handleSave} provinces={provinces} wards={wards} districts={districts} hanldeResetFieldDistrict={hanldeResetFieldDistrict} hanldeResetFieldProvinces={hanldeResetFieldProvinces} loadingInitialData={loadingInitialData} initialForm={initialForm} />
        </>
    )
}