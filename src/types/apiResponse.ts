export type ApiResponseNoResult ={
    code: number;
    message: string;
}

export type ApiResponse<T> = ApiResponseNoResult & {
    result: T | null; 
};
