import { CLOSE, SHOW } from "./commonConstants";

export interface ErrorResponse {
    code: number;
    message: string;
}
export interface ParamActionUrl {
    key: string;
    value: string;
}
export interface NotificationPayload {
    type: typeof SHOW | typeof CLOSE;
    message?: string; // Optional message
    handleServiceConfirm?: () => void; // Optional function
}