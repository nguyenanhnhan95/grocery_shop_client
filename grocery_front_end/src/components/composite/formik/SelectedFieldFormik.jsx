import { FormControl, MenuItem} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import "../../../assets/css/composite/formik/selectedFieldFormik.css"
import { StyleFocusFormControl} from '../styleMui/selectMui';

export const SelectFieldFormik = ({ options, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const handleChange = (event) => {
        setFieldValue(field.name, event.target.value);
    };
    return (
        <FormControl fullWidth error={meta.touched && !!meta.error}>
            <StyleFocusFormControl
                {...field}
                {...props}
                value={field.value || ''}
                displayEmpty
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                MenuProps={{
                    disableScrollLock: true,
                }}
            >

                {options && options.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </StyleFocusFormControl>
        </FormControl>
    )
}