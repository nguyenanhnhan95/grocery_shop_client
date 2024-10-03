enum EAccountStatus {
    ACTIVATED = "Đã kích hoạt",
    INACTIVE = "Chưa kích hoạt",
    LOCK = "Đã khóa"
}
type StatusAccount={
    id:number,
    name:string
}
type Employee = {
    id: number;  // Long in Java is a number in TypeScript
    avatar: string;
    name: string;
    nameLogin: string;
    createDate: Date
    phone: string;
    email: string;
    accountStatus: keyof typeof EAccountStatus;
    idIdentification?: string;
    birthOfDate?: Date;
    address?: string;
    provinces?: string;
    districts?: string;
    wards?: string;
    roles?: number[];  // List<Long> in Java is an array of numbers in TypeScript
}

