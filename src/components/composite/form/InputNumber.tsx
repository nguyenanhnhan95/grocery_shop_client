
import { TextField } from "@mui/material";
import { FieldProps, useField, useFormikContext } from "formik";
import { NumericFormat, NumericFormatProps } from "react-number-format";
interface NumberInputProps extends Omit<NumericFormatProps<number>, 'onValueChange'>, Omit<FieldProps<number>, 'form'> {
    placeholder?: string;
    disabled?: boolean;
    title?: string;
    autoComplete?: string;
    className?: string;
    name:string
}
export const InputNumber: React.FC<NumberInputProps> = ({name,...props}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);
    const handleSetField = (value: number) => {
        setFieldValue(field.name, value * 1);
    }
    
    return (
        <NumericFormat
            {...field}
            // {...props}
            customInput={TextField}
            onValueChange={(values) => handleSetField(values.floatValue ?? 0)}
        />
    )
}