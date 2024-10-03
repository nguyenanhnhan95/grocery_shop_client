import { useDebounce } from "@/hooks/common/useDebounce";
import { InputProps } from "@/types/inputProps";
import { useField, useFormikContext } from "formik";
import { KeyboardEvent, memo, TextareaHTMLAttributes, useCallback, useEffect, useState } from "react";
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    id?: string,
    name: string,
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    title?: string,
    autoComplete?: string,
    className: string,
    autofocus?:boolean,
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<TextAreaProps> = ({name,...props}) =>{
    const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const [localValue, setLocalValue] = useState<string>(field.value)
  const debouncedValue = useDebounce(localValue, 500)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalValue(event.target.value); // Update local value immediately on input change
    }, []);
  useEffect(() => {
    setFieldValue(field.name, debouncedValue);
  }, [debouncedValue, field.name, setFieldValue]);
  return (
    <div>
      <textarea {...field} value={localValue} {...props} onChange={handleChange} />
    </div>
  );
};

export default memo(TextArea);