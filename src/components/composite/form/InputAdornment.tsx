'use client';
import { useDebounce } from "@/hooks/common/useDebounce";
import { InputProps } from "@/types/inputProps";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";
interface AdornmentInputProps extends InputProps {
    adornment: string
}
const InputCustomAdornment: React.FC<AdornmentInputProps> = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.name);
    const [localValue, setLocalValue] = useState<string>(field.value)
    const debouncedValue = useDebounce(localValue, 500)
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setLocalValue(event.target.value); // Update local value immediately on input change
        }, []);
    useEffect(() => {
        setFieldValue(field.name, debouncedValue);
    }, [debouncedValue, field.name, setFieldValue]);
    return (
        <FormControl variant="outlined">
            <OutlinedInput
                {...field}
                value={localValue}
                className={props.className}
                type={props.type}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">{props.adornment}</InputAdornment>}
            />
        </FormControl>
    )
}
export default InputCustomAdornment;