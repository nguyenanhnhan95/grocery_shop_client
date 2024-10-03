import { InputProps } from "@/types/inputProps";
import { useField, useFormikContext } from "formik";
import { memo, useCallback } from "react";
interface PropsCheckbox<T> extends InputProps{
    instant:T
}
function CheckBox<T>({ name,instant, ...props }: PropsCheckbox<T>) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);
    const hanldeCheked =useCallback((instant:T) => {       
        if(Array.isArray(field?.value)){
            let permissionTemp= [...field.value]
            let index =permissionTemp.indexOf(instant)
            if (index !== -1) {
                permissionTemp.splice(index, 1);
            }else{
                permissionTemp.push(instant);
            }
            setFieldValue(field.name,permissionTemp)
        } 
    },[field,field.name,field.value])
    return (
        <>
            <input {...props} onChange={() => hanldeCheked(instant)} checked={(Array.isArray(field?.value) && field?.value.includes(instant)) } />
        </>
    )
}
export default memo(CheckBox)