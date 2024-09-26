'use client';
import { useDebounce } from "@/hooks/common/useDebounce";
import { InputProps } from "@/types/inputProps";
import { useField, useFormikContext } from "formik";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const CustomInput: React.FC<InputProps> = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  const [localValue, setLocalValue] = useState<string>(field.value)
  const debouncedValue = useDebounce(localValue, 500)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value); // Update local value immediately on input change
    }, []);
  useEffect(() => {
    setFieldValue(field.name, debouncedValue);
  }, [debouncedValue, field.name, setFieldValue]);
  return (
    <div>
      <input autoFocus={props.autofocus || false}  autoComplete={props.autoComplete} className={props.className} placeholder={props.placeholder} onChange={handleChange} type={props.type} />
    </div>
  );
};
export default memo(CustomInput);