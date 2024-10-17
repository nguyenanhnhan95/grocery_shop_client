'use client';

import {  InputTextAreaProps } from "@/types/inputProps";
import { debounce } from "@/utils/commonUtils";
import { useField, useFormikContext } from "formik";
import React, { memo, useCallback, useMemo } from "react";

const InputTextArea: React.FC<InputTextAreaProps> = ({name,...props}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(field.name, event.target.value)
  }, [field.name, setFieldValue]);
  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), [handleChange]);
  return (
    <div>
      <textarea {...props}  onChange={debouncedHandleChange} />
    </div>
  );
};
export default memo(InputTextArea);