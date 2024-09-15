import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";


export interface InputProps {
    id:string,
    name:string,
    type?:string,
    placeholder?:string ,
    disabled?:boolean ,
    title?:string,
    autoComplete?:string,
    className:string,
}
// interface InputProps extends FormikProps<InputProps> {
    
// }
export interface CustomDatePickerProps extends  DatePickerProps<Dayjs,false> {
    id:string,
    name:string,
    type:Dayjs,
    placeholder?:string ,
    disabled?:boolean ,
    title?:string,
    autoComplete?:string,
    className?:string
}