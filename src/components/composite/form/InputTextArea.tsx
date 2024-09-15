'use client';
import { InputProps } from "@/types/inputProps";
import { debounce } from "@/utils/commonUtils";
import {  useField, useFormikContext } from "formik";
import { memo, useCallback, useMemo } from "react";

const InputTextArea : React.FC<InputProps> = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleChange = useCallback((event:React.ChangeEvent<HTMLTextAreaElement>) => {   
            setFieldValue(field.name, event.target.value)
    }, [field.name, setFieldValue]);
    const debouncedHandleChange  = useMemo(() => debounce(handleChange, 500), [handleChange]);
    return (
      <div>
        <textarea defaultValue={field.value}  {...field} placeholder={props.placeholder} onChange={debouncedHandleChange }  />
      </div>
      );
};
export default  memo(InputTextArea);