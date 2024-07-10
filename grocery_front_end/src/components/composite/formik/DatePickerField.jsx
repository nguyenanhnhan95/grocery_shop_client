import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
export const DatePickerField = ({ field, form, ...props }) => {
    return (
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                form.setFieldValue(field.name, val);
            }}
        />
    );
};