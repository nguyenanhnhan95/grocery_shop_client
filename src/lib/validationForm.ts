import { THIS_FIELD_BIRTH_OF_DATE_GREATER_THAN_18, THIS_FIELD_CANNOT_EMPTY, THIS_FIELD_CONFIRM_NOT_MATCH, THIS_FIELD_VALUE_NOT_FORMAT, THIS_FILE_NOT_FORMAT, THIS_FILE_SIZE_TOO_LARGE, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, THIS_FILED_MONEY_TOO_LARGE, THIS_FILED_MUST_POSITIVE, THIS_FILED_SELECT_ITEM_CANNOT_EMPTY, THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY } from '@/utils/commonConstants';
import * as Yup from 'yup';
import differenceInYears from "date-fns/differenceInYears";
export const fileValidation = (maxSize: number, allowedTypes: string[], isNullable: boolean = true): Yup.MixedSchema<File[] | undefined | null, Yup.AnyObject> => {
    let schema: Yup.MixedSchema<File[] | null | undefined, Yup.AnyObject> = Yup.mixed<File[]>();
    if (isNullable) {
        schema = schema.nullable()
    } else {
        schema = schema.required(THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY)
    }
    schema = schema.test('fileSize', THIS_FILE_SIZE_TOO_LARGE, (values: File[] | undefined | null) => {
        if (values) {
            return !values.some(value => value.size > maxSize);
        }
        return true;
    });
    schema = schema.test('fileType', THIS_FILE_NOT_FORMAT, (values: File[] | undefined | null) => {

        if (values) {
            return values.some(value => allowedTypes.includes(value.type));
        }
        return true;
    });

    return schema;
}
export const stringValidation = (minSize: number, maxSize: number, regex: RegExp, isNullable: boolean = true): Yup.StringSchema<string | undefined | null, Yup.AnyObject> => {
    let schema: Yup.StringSchema<string | undefined | null, Yup.AnyObject> = Yup.string();

    if (isNullable) {
        schema = schema.nullable();

    } else {
        schema = schema.test('trim-if-needed', THIS_FIELD_VALUE_NOT_FORMAT, (value) => {
            if (value && typeof value === 'string' && value.length > 0) {
                value = value.trim();
            }
            return true;  // Luôn trả về true để không ảnh hưởng đến giá trị khác
        });
        schema = schema.required(THIS_FIELD_CANNOT_EMPTY);

    }
    schema = schema
        .min(minSize, THIS_FILED_ENTER_SMALL)
        .max(maxSize, THIS_FILED_ENTER_LARGE)
    if (regex) {
        schema = schema.matches(regex, THIS_FIELD_VALUE_NOT_FORMAT);
    }
    return schema;
}
export const numberValidation = (min: number, max: number, isNullable: boolean = true): Yup.NumberSchema<number | undefined | null, Yup.AnyObject> => {
    let schema: Yup.NumberSchema<number | undefined | null, Yup.AnyObject> = Yup.number();

    if (isNullable) {
        schema = schema.nullable();

    } else {
        schema = schema.required(THIS_FIELD_CANNOT_EMPTY);

    }
    schema = schema
        .min(min, THIS_FILED_MUST_POSITIVE)
        .max(max, THIS_FILED_MONEY_TOO_LARGE)
    return schema;
}
export const confirmPasswordValidation = (minSize: number, maxSize: number, regex: RegExp, isNullable: boolean = true): Yup.StringSchema<string | undefined | null, Yup.AnyObject> => {
    let schema: Yup.StringSchema<string | undefined | null, Yup.AnyObject> = Yup.string();

    if (isNullable) {
        schema = schema.nullable();

    } else {
        schema = schema.test('trim-if-needed', THIS_FIELD_VALUE_NOT_FORMAT, (value) => {
            if (value && typeof value === 'string' && value.length > 0) {
                value = value.trim();
            }
            return true;  // Luôn trả về true để không ảnh hưởng đến giá trị khác
        });
        schema = schema.required(THIS_FIELD_CANNOT_EMPTY);

    }


    schema = schema
        .min(minSize, THIS_FILED_ENTER_SMALL)
        .max(maxSize, THIS_FILED_ENTER_LARGE)
    if (regex) {
        schema = schema.matches(regex, THIS_FIELD_VALUE_NOT_FORMAT);
    }

    schema = schema
        .oneOf([Yup.ref('password')], THIS_FIELD_CONFIRM_NOT_MATCH);

    return schema;
};
export const selectValidation = <T>(options: T[] | null, attribute: keyof T, isArrayEmpty: boolean = true): Yup.StringSchema<string | undefined | null, Yup.AnyObject> => {
    let schema: Yup.StringSchema<string | undefined | null, Yup.AnyObject> = Yup.string();

    if (isArrayEmpty) {
        schema = schema.nullable();
    } else {
        schema = schema.test('trim-if-needed', THIS_FIELD_VALUE_NOT_FORMAT, (value) => {
            if (value && typeof value === 'string' && value.length > 0) {
                value = value.trim();
            }
            return true;  // Luôn trả về true để không ảnh hưởng đến giá trị khác
        });
        schema = schema.required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY)
        schema = schema.test('is-in-options', THIS_FIELD_VALUE_NOT_FORMAT, (value) => {
            if (value && options) {
                return options.some(option => option[attribute] === value)
            }
        })
    }
    return schema;
}
export const selectMultiValidation = <T, E>(options: T[] | null, attribute: keyof T, isArrayEmpty: boolean = true): Yup.ArraySchema<E[] | undefined | null, Yup.AnyObject> => {
    let schema: Yup.ArraySchema<E[] | undefined | null, Yup.AnyObject> = Yup.array();

    if (isArrayEmpty) {
        schema = schema.nullable();
    } else {
        schema = schema.required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY)
        schema = schema.test('is-in-options', THIS_FIELD_VALUE_NOT_FORMAT, (value) => {
            if (value && options) {
                return value.every((item) =>
                    options.some(option => option[attribute] === item)
                );
            }
        })
    }
    return schema;
}
export const dateValidation = (startDate: Date, endDate: Date | number | null, isDateEmpty: boolean = true): Yup.DateSchema<Date | undefined | null, Yup.AnyObject> => {
    let schema: Yup.DateSchema<Date | undefined | null, Yup.AnyObject> = Yup.date();
    if (isDateEmpty) {
        schema = schema.nullable();
    } else {
        schema = schema.required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY)

    }

    schema = schema.min(startDate , THIS_FIELD_VALUE_NOT_FORMAT)
    if (endDate) {
        if (endDate instanceof Date) {
            schema = schema.max(endDate, THIS_FIELD_VALUE_NOT_FORMAT);
        } else {
            schema = schema.test('is-over-18', THIS_FIELD_BIRTH_OF_DATE_GREATER_THAN_18, (value) => {
                if (value) {
                    return differenceInYears(new Date(), new Date(value)) >= endDate;
                }
                return true;
            });
        }
    }
    return schema;
}