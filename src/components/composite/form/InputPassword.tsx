'use client';
import { InputProps } from "@/types/inputProps";
import { PLACE_HOLDER_PASSWORD } from "@/utils/commonConstants";
import { debounce } from "@/utils/commonUtils";
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export const InputPassword: React.FC<InputProps> = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.name);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field.name, event.target.value)
    }, [field.name, setFieldValue]);
    const debouncedHandleEnterData = useMemo(() => debounce(handleChange, 500), [handleChange]);
    return (
        <FormControl className={props.className} variant="outlined">
            <OutlinedInput
                autoComplete="current-password"
                placeholder={PLACE_HOLDER_PASSWORD}
                onChange={debouncedHandleEnterData}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            className="icon-button"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}