export const useMultipart = <T>() => {
    const multiPart = new FormData();

    const addItem = (key: string, value: T) => {
        if (value !== undefined && value !== null) {
            multiPart.append(key, value as unknown as Blob);
        }
    };

    const removeItem = (key: string) => {
        multiPart.delete(key);
    };

    const getAllItems = () => {
        const items: Record<string, any> = {};
        for (const pair of multiPart.entries()) {
            items[pair[0]] = pair[1];
        }
        return items;
    };
    const getItem = (key: string) => {
        return multiPart.get(key);
    };
    const getMultipart=()=>{
        return multiPart;
    }
    return { addItem, removeItem, getAllItems ,getItem,getMultipart};
};