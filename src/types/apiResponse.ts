interface ApiResponseNoResult {
    code: number;
    message: string;
}

type ApiResponse<T> = ApiResponseNoResult & {
    result: T | null; 
};
