
import { TextField } from "@mui/material";
import { FieldProps, useField, useFormikContext } from "formik";
import { NumericFormat, NumericFormatProps } from "react-number-format";
interface NumberInputProps extends Omit<NumericFormatProps<number>, 'onValueChange'>, Omit<FieldProps<number>, 'form'> {
    placeholder?: string;
    disabled?: boolean;
    title?: string;
    autoComplete?: string;
    className?: string;
}
export const NumberFormatField: React.FC<NumberInputProps> = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleSetField = (value:number) => {
        setFieldValue(field.name, value * 1);
    }
    return (
        <NumericFormat
            // {...props}
            customInput={TextField}
            onValueChange={(values) => handleSetField(values.floatValue ?? 0)}
        />
    )
}