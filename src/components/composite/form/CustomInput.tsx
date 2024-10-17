'use client';
import { useDebounce } from "@/hooks/common/useDebounce";
import { InputProps } from "@/types/inputProps";
import { useField, useFormikContext } from "formik";
import React, { memo, useCallback, useEffect,  useState } from "react";

const CustomInput: React.FC<InputProps> = ({name,...props}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const [localValue, setLocalValue] = useState<string>(field.value)
  const debouncedValue = useDebounce(localValue, 500)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);
    }, []);
  useEffect(() => {
    setFieldValue(field.name, debouncedValue);
  }, [debouncedValue, field.name, setFieldValue]);
  return (
    <div>
      <input {...field}  value={localValue || ''} {...props} onChange={handleChange} />
    </div>
  );
};
export default memo(CustomInput);