export enum EAccountStatus {
    ACTIVATED = "Đã kích hoạt",
    INACTIVE = "Chưa kích hoạt",
    LOCK = "Đã khóa"
}
export type StatusAccount={
    id:number,
    name:string
}
export type Employee = {
    id: number;  
    avatar: string;
    name: string;
    nameLogin: string;
    createDate: Date,
    idCard: string | null,
    phone: string;
    email: string;
    accountStatus: keyof typeof EAccountStatus;
    idIdentification?: string;
    birthOfDate: Date;
    address: string;
    provinces: string;
    districts: string;
    wards: string;
    roles: number[];  // List<Long> in Java is an array of numbers in TypeScript
}
export type EmployeeAddOrEdit = {
    id?: number;  
    avatar: File[] | [];
    name: string;
    nameLogin: string;
    idCard: string | null,
    password:string|null,
    confirmPassword:string|null,
    phone: string;
    email: string;
    accountStatus: keyof typeof EAccountStatus | null;
    birthOfDate: Date|null;
    address: string;
    provinces: string;
    districts: string;
    wards: string;
    roles: number[];  
}
export type EmployeeDto ={
    id? : number | null,
    avatar: null | File[]  ,
    name: string | null,
    email: string | null,
    nameLogin: string | null,
    password: string | null,
    confirmPassword: string | null,
    provinces: string | null,
    districts: string | null,
    wards: string | null,
    accountStatus: string | null,
    phone: string | null,
    roles: number[] | null,
    address: string | null,
    birthOfDate: Date | null,
    idCard: string | null
}
