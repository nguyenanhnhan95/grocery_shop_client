'use client';

import { InputProps } from "@/types/inputProps";
import CustomDate from "./CustomDate";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import React from "react";

const InputDate: React.FC<InputProps> = (props) => {
    const [field] = useField(props.name);
    const { setFieldValue } = useFormikContext();
    return (
        <CustomDate
            {...field}
            value={field.value ? dayjs(new Date(field.value)) : null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
            title={props.title}
            {...props}
        />
    );
}
export default InputDate;