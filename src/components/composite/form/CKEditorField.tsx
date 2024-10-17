import { useDebounce } from "@/hooks/common/useDebounce";
import { InputProps } from "@/types/inputProps";
import { useField, useFormikContext } from "formik";
import React, { memo, useCallback, useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Alignment, Autoformat, Bold, ClassicEditor, Essentials, Font, Heading, Indent, IndentBlock, Italic, List, Paragraph, SpecialCharacters, SpecialCharactersEssentials, Underline } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';
import './styles/ckeEditorFiled.css'
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
const CKEditorField: React.FC<InputProps> = ({name}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);
    const [localValue, setLocalValue] = useState<string>(field.value)
    const debouncedValue = useDebounce(localValue, 500)
    const handleChange = useCallback(
        (data: string) => {
          setLocalValue(data);
        }, []);
      useEffect(() => {
        setFieldValue(field.name, debouncedValue);
      }, [debouncedValue, field.name, setFieldValue]);
    return (
        <CKEditor 
            editor={ClassicEditor}
            config={{
                plugins: [Essentials,
                    Bold,
                    Italic,
                    Underline,
                    Indent,
                    IndentBlock,
                    Heading,
                    Font,
                    Autoformat,
                    Paragraph,
                    Alignment,
                    List,
                    SpecialCharacters,SpecialCharactersEssentials],
                toolbar: [ 'undo',
                    'redo',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'alignment',
                    '|',
                    'indent',
                    'outdent',
                    '|',
                    'fontFamily',
                    'fontSize',
                    'fontColor',
                    'fontBackgroundColor',
                    '|',
                    'specialCharacters',
                    '|'],
            }}
            
            data={field.value || ''}
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor 1 is ready to use!', editor);
            }}
            onChange={(event,editor:ClassicEditor)=>
                handleChange(editor.getData())
            }
            
        />
    )
}
export default memo(CKEditorField)
