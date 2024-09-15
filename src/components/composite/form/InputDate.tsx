'use client';
import { InputProps } from "@/types/inputProps";
import CustomDate from "./CustomDate";
import dayjs from "dayjs";
import { useField } from "formik";

const InputDate : React.FC<InputProps> = (props) =>{
    const [field] = useField(props.field);
    return (
        <CustomDate 
               value={field.value ? dayjs(new Date(field.value)) : null}
               onChange={val => {
                   props.form.setFieldValue(field.name, val);
               }}
               title={props.title}
               {...props}
        />
    );
}
export default InputDate;