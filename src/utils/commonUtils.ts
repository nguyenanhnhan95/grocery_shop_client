import { DOMAIN_CLIENT, DOMAIN_SERVER } from "./commonConstants";
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
}