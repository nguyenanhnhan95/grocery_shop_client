export interface ConstraintErrors {
    code: number;
    result: Record<string, string>; 
}
export interface ResponseErrors {
    code: number;
    message: string; 
}