'use client';
import { InputProps } from "@/types/inputProps";
import { debounce } from "@/utils/commonUtils";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
interface AdornmentInputProps extends InputProps{
    adornment:string
}
const InputCustomAdornment : React.FC<AdornmentInputProps> = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleChange = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {   
            setFieldValue(field.name, event.target.value)
    }, [field.name, setFieldValue]);
    const debouncedHandleChange  = useMemo(() => debounce(handleChange, 500), [handleChange]);
    return (
        <FormControl variant="outlined">
            <OutlinedInput
                className={props.className}
                type={props.type}
                onChange={debouncedHandleChange}
                endAdornment={<InputAdornment position="end">{props.adornment}</InputAdornment>}
            />
        </FormControl>
    )
}
export default InputCustomAdornment;