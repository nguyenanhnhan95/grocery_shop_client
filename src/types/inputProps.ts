import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React, { KeyboardEvent, TextareaHTMLAttributes } from "react";


 export interface InputProps {
    id?: string,
    name: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className: string,
    autoFocus?:boolean,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
}
export interface InputTextAreaProps {
    id?: string,
    name: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className: string,
    autoFocus?:boolean,
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void; 
}
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    id?: string,
    name: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className: string,
    autofocus?:boolean,
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}
export interface CustomDatePickerProps extends DatePickerProps<Dayjs, false> {
    id?: string,
    name?: string,
    type?: string ,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className?: string,
    value?: Dayjs | null; // Thay đổi có thể cần ở đây
    onChange: (val: Dayjs | null) => void;
}