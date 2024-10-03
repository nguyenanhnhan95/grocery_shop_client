import { ALLOW_ARRAY_IMAGES, DOMAIN_CLIENT, DOMAIN_SERVER } from "./commonConstants";
import { ParamActionUrl } from "./types";
/**
 * Loại bỏ phần URI của domain từ một URL hiện tại.
 * @param createActionURL - URL give request to server.
 * @returns url restfulapi.
 */
export const createActionURL = (sub: string) => {

    const createUrl = (action?: string) => `${DOMAIN_SERVER}/${sub}${action ? `${action}` : ''}`;

    return {
        instant: () => createUrl(),
        add: () => createUrl('add'),
        edit: () => createUrl('edit'),
        search: () => createUrl('search'),
        pathVariable: (value: string) => createUrl(`/${value}`),
        requestParam: (attributes: ParamActionUrl[]) => {
            if (!Array.isArray(attributes) || attributes.length === 0) return createUrl();

            if (attributes.length === 1) {
                return `${createUrl()}?${attributes[0].key}=${attributes[0].value}`;
            }

            const queryParams = attributes.map(attr => `${encodeURIComponent(attr.key)}=${encodeURIComponent(attr.value)}`).join('&');
            return createUrl(`?${queryParams}`);
        }
    };
};
export function convertToJsonFile(data:any){
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    return blob;
}
/**
 * Loại bỏ phần URI của domain từ một URL hiện tại.
 * @param urlCurrent - URL hiện tại.
 * @returns Chuỗi URL sau khi loại bỏ phần domain.
 */
export const removeURIDomain = (urlCurrent: string): string => {
    try {
        if (!DOMAIN_CLIENT || !urlCurrent || typeof urlCurrent !== 'string') {
            return "";
        }
        const size = DOMAIN_CLIENT.length;
        return urlCurrent.startsWith(DOMAIN_CLIENT)
            ? urlCurrent.substring(size)
            : urlCurrent;
    } catch (error) {
        console.error("Error removing URI domain:", error);
        return "";
    }
};
/**
 * Loại bỏ phần URI của domain từ một URL hiện tại.
 * @param getURICurrent .
 * @returns Chuỗi URL hiện tại.
 */
export const getURICurrent = () => {
    return window.location.href;
}
/**
* DEBOUNCE
*/
export  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number,
): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}/**
* Validation
*/
export const validation = {
    isEmailAddress: function (str: string): boolean {
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);
    },
    isNotEmpty: function (str: string): boolean {
        const pattern = /\S+/;
        return pattern.test(str);
    },
    isNumber: function (str: string): boolean {
        const pattern = /^\d+\.?\d*$/;
        return pattern.test(str);
    },
    isSame: function (str1: string, str2: string): boolean {
        return str1 === str2;
    },
    isPercent: function (str: string): boolean {
        const num = Number(str);
        return this.isNumber(str) && num >= 0 && num <= 100;
    },
    isBoolean: function (boolean: unknown): boolean {
        return typeof boolean === 'boolean';
    },
    isTypeImage: function (str: string): boolean {
        const extension = str.split('.').pop()?.toLowerCase();
        return extension ? ALLOW_ARRAY_IMAGES.indexOf(extension) !== -1 : false;
    },
    isString: function (str: unknown): boolean {
        return typeof str === 'string' || str instanceof String;
    },
    isArrayEmpty: function (array: unknown): boolean {
        return Array.isArray(array) && array.length === 0;
    },
    isFile: function (input: unknown): boolean {
        return 'File' in window && input instanceof File;
    },
    checkJsonString: function (str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    checkArrayNotEmpty: function (array: unknown): boolean {
        return Array.isArray(array) && array.length > 0;
    },
    checkFileTypeImage: function (files: FileList | null): boolean {
        if (files) {
            for (const value of Array.from(files)) {
                if (!validation.isTypeImage(value.name)) {
                    return false;
                }
            }
        }
        return true;
    },
    checkFileSize: function (files: File[] | null | undefined): boolean {
        if (files) {
            for (const file of Array.from(files)) {
                if (file.size >= 10000000) { // 10MB limit
                    return false;
                }
            }
        }
        return true;
    },
    checkFunction: function (func: unknown): boolean {
        return typeof func === 'function';
    },
    checkStringNotEmpty: function (str: unknown): boolean {
        return typeof str === 'string' && str.length > 0;
    },
    isNumberKey: function (evt:  React.KeyboardEvent<HTMLInputElement>): boolean {
        const char = evt.key;
        console.log(char >= '0' && char <= '9')
        return char >= '0' && char <= '9';
    },
    checkDateGraterThenDateCurrent: function (date: Date): boolean {
        if (date instanceof Date && !isNaN(date.getTime())) {
            const dateCurrent = new Date();
            return (
                dateCurrent.getFullYear() === date.getFullYear() &&
                dateCurrent.getDate() === date.getDate()
            );
        }
        return false;
    },
    checkBirthOfDate: function (value: string): boolean {
        return differenceInYears(new Date(), new Date(value)) >= 18;
    },
};

// Utility function for calculating the difference in years
function differenceInYears(date1: Date, date2: Date): number {
    const diff = date1.getTime() - date2.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    return Math.floor(diffInDays / 365.25);
}