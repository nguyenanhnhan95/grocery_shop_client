import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
    position: "top-right" as const,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
interface TOASTTOPRIGHT {
    toastSuccess: (title: string) => void;
    toastInformation: (title: string) => void;
    toastWarning: (title: string) => void;
    toastError: (title: string) => void;
    toastDefault: (title: string) => void;
}
export const toastTopRight: TOASTTOPRIGHT = {
    toastSuccess: (title: string) => {
        toast.success(title, defaultOptions);
    },
    toastInformation: (title: string) => {
        toast.info(title, defaultOptions);
    },
    toastWarning: (title: string) => {
        toast.warn(title, defaultOptions);
    },
    toastError: (title: string) => {
        toast.error(title, defaultOptions);
    },
    toastDefault: (title: string) => {
        toast(title, defaultOptions);
    },
};