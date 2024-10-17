'use client';
import { PLACE_HOLDER_PASSWORD } from "@/utils/commonConstants";
import { debounce } from "@/utils/commonUtils";
import { FormControl, IconButton, InputAdornment,  OutlinedInput } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { MouseEvent, useCallback, useMemo, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputProps } from "@/types/inputProps";
export const InputPassword: React.FC<InputProps> = ({name,className}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);
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
        <FormControl className={className} variant="outlined">
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