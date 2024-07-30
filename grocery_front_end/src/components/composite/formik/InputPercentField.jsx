import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { EMPTY_STRING } from "../../../utils/commonConstants";
import { validation } from "../../../utils/validation";

export const InputPercentField = ({ ...props }) => {
    const [interest, setInterest] = useState('');
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleKeyUp = (e) => {
        let valueRecord = e.target.value.replace(/[\.\%]/g, '');
        let valueShow = EMPTY_STRING;
        if (validation.isPercent(valueRecord) && validation.isNotEmpty(valueRecord)) {
            valueShow = (parseInt(valueRecord) / 100).toFixed(2) + '%';
        } else {
            valueShow = EMPTY_STRING;
            valueRecord = EMPTY_STRING;
        }
        setFieldValue(field.name, valueRecord*1);
        setInterest(valueShow);
    };

    return (

        <input
            type="text"
            className={props.class}
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            onKeyUp={handleKeyUp}
        />
    );
}