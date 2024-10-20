import { ARRAY_EMPTY } from "@/utils/commonConstants";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { memo, useCallback } from "react";

interface SelectProps<T, E extends string | number | readonly string[]> {
    options: T[];
    attribute: keyof T;
    attributeShow: keyof T;
    processField?: (value: any, setFieldValue: (field: string, value: E | null) => void) => void;
    nameDefault?: string;
    multi: boolean;
    className?: string;
    name: string;
}

function SelectForm<T, E extends string | number | readonly string[]>({ options, attribute, attributeShow, processField, ...props }: SelectProps<T, E>) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.name);
    const handleChange = useCallback((event: SelectChangeEvent<E>) => {
        const { value } = event.target;
        if (Array.isArray(value) && value.includes('')) {
            setFieldValue(field.name, ARRAY_EMPTY);
        } else {
            setFieldValue(field.name, value);
        }

        if (processField) {
            processField(value, setFieldValue);
        }
    }, [processField, field.name, setFieldValue]);
    const renderValue = (selectedValue: E | E[]) => {
        if (Array.isArray(selectedValue) && selectedValue.length > 0) {
            const selectedOptions = options.filter(option => selectedValue.includes(option[attribute] as E));
            if (selectedOptions.length === 0) {
                return props.nameDefault
            }
            return selectedOptions.map(option => String(option[attributeShow])).join(', ');
        }

        const selectedOption = options.find(option => option[attribute] === selectedValue);
        return selectedOption ? String(selectedOption[attributeShow]) : props.nameDefault;
    };
    return (
        <FormControl fullWidth >
            <Select
                className={props.className}
                multiple={props.multi}
                value={field.value ?? (props.multi ? [] : '')}
                displayEmpty
                onChange={handleChange} 
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={value => renderValue(value)}
                MenuProps={{
                    disableScrollLock: true,
                }}
            >
                <MenuItem value="">{props.nameDefault}</MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option[attribute] as E}>
                        {String(option[attributeShow])}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default memo(SelectForm) as typeof SelectForm;