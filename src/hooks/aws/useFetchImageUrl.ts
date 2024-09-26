import { getObjectUrlImage } from "@/config/S3Config";
import { useCallback, useState, useMemo } from "react";

export const useFetchImageUrl = () => {
    const [state, setState] = useState({
        isPending: false,
        error: null as string | null,
        data: null as string | null,
    });

    const fetchUrlImage = useCallback(async (keyName: string) => {
        setState({ isPending: true, error: null, data: null });
        try {
            const response = await getObjectUrlImage(keyName);
            setState({ isPending: false, error: null, data: response || null });
        } catch (err) {
            const result = (err as Error).message;
            setState({ isPending: false, error: result, data: null });
        }
    }, []);

    const { isPending, error, data } = state;

    return useMemo(() => ({ fetchUrlImage, isPending, error, data }), [fetchUrlImage, isPending, error, data]);
};