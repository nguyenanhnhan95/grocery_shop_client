export interface ApiResponse<T> {
    code: number;
    message: string;
    result?: T | null; // result có thể không tồn tại
}