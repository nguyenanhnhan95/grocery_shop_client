import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";


 export interface InputProps {
    id: string,
    name: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className: string,
    autofocus?:boolean
}
// interface InputProps extends FormikProps<InputProps> {

// }
interface CustomDatePickerProps extends DatePickerProps<Dayjs, false> {
    id?: string,
    name?: string,
    type?: string ,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className?: string,
    value?: Dayjs | null; // Thay đổi có thể cần ở đây
    onChange: (val: Dayjs | null) => void;
}